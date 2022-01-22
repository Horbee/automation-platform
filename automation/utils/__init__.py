import pydash as _

from google.oauth2 import id_token
from google.auth.transport import requests
from automation.models import User
from automation.vacuum.responses import dialogflow_response
from functools import wraps
from flask import request, g, jsonify, current_app


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if not request.headers.get("authorization"):
            # raise APIUserError("Missing Token")
            return jsonify({"error": "Authentication", "message": "Missing Token"}), 401

        # Bearer will be cut down
        id_token = request.headers["authorization"][7:]
        id_info = verify_token(id_token, current_app.config["GOOGLE_CLIENT_ID"])

        if id_info is None or not "sub" in id_info:
            return jsonify({"error": "Authentication", "message": "Invalid Token"}), 401
        
        user = User.query.filter_by(sub=id_info["sub"]).first()

        if user is None:
            return jsonify({"error": "Authentication", "message": "User not registered"}), 401

        # make user available down the pipeline via flask.g
        g.user = user

        # finally call f. f() now haves access to g.user
        return f(*args, **kwargs)
   
    return wrap


# Wraps functionality for checking google Authentication and Authorization
def google_login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        id_token = _.get(request.json, 'originalDetectIntentRequest.payload.user.idToken')
        if id_token is None:
            return dialogflow_response("Authentication error: Token is Missing")

        id_info = verify_token(id_token, current_app.config["GOOGLE_ASSISTANT_CLIENT_ID"])
        
        if id_info is None or not "sub" in id_info:
            # return jsonify({"error": "Authentication", "message": "Invalid Token"}), 401
            return dialogflow_response("Authentication error: Token is Invalid")
        
        user = User.query.filter_by(sub=id_info["sub"]).first()

        if user is None:
            return dialogflow_response("Authentication error: User is not registered")

        if not user.is_authorized:
            return dialogflow_response("User is not authorized to access this endpoint")

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


def verify_token(token, client_id):
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        id_info = id_token.verify_firebase_token(token, requests.Request(), client_id)
        return id_info
    except ValueError:
        # Invalid token
        current_app.logger.error("Invalid Token")
        return None
        