from google.oauth2 import id_token
from google.auth.transport import requests
from automation import Config
from automation.models import User
from functools import wraps
from flask import request, g, jsonify, current_app

# from automation.user.error import APIUserError

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if not request.headers.get("authorization"):
            # raise APIUserError("Missing Token")
            return jsonify({"error": "Authentication", "message": "Missing Token"}), 401

        # Bearer will be cut down
        id_token = request.headers["authorization"][7:]
        id_info = verify_token(id_token)

        if id_info is None or not "sub" in id_info:
            # raise APIUserError("Invalid Token")
            return jsonify({"error": "Authentication", "message": "Invalid Token"}), 401


        # get user via some ORM system
        user = User.query.filter_by(sub=id_info["sub"]).first()

        if user is None:
            # raise APIUserError("User not registered")
            return jsonify({"error": "Authentication", "message": "User not registered"}), 401

        # make user available down the pipeline via flask.g
        g.user = user
        # finally call f. f() now haves access to g.user
        return f(*args, **kwargs)
   
    return wrap


def admin_login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        # user is available from @login_required
        if not g.user.is_admin:
            return "Not enough Permission", 403
        return f(*args, **kwargs)
    
    return wrap


def authorization_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        # user is available from @login_required
        if not g.user.is_authorized:
            return "Not authorized to access this endpoint", 403
        return f(*args, **kwargs)
    
    return wrap


def verify_token(token):
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), current_app.config["GOOGLE_CLIENT_ID"])
        return id_info
    except ValueError:
        # Invalid token
        current_app.logger.error("Invalid Token")
        return None