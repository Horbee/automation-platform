from google.oauth2 import id_token
from google.auth.transport import requests
from automation import Config
from automation.models import User
from functools import wraps
from flask import request, abort, Response, g


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if not request.headers.get("authorization"):
            # abort(401)
            abort(Response("Missing Token"))
        
        # Bearer will be cut down
        id_token = request.headers["authorization"][7:]
        id_info = verify_token(id_token)

        if id_info is None or not "sub" in id_info:
            abort(Response("Invalid Token"))

        # get user via some ORM system
        user = User.query.filter_by(sub=id_info["sub"]).first()

        if user is None:
            abort(Response("User not registered"))

        # make user available down the pipeline via flask.g
        g.user = user
        # finally call f. f() now haves access to g.user
        return f(*args, **kwargs)
   
    return wrap


def verify_token(token):
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), Config.GOOGLE_CLIENT_ID)
        return id_info
    except ValueError:
        # Invalid token
        print("Invalid Token")
        return None