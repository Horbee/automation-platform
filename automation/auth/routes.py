from flask import Blueprint, request
from automation import db
from automation.utils import verify_token
from automation.models import User, user_schema

auth = Blueprint('auth', __name__)
from automation.auth.error import APIAuthError


@auth.route("/api/login", methods=['POST'])
def login():
    # return User data to user or register user
    if not request.json or not 'idToken' in request.json:
        raise APIAuthError("idToken not found")
    
    id_token = request.json['idToken']
    id_info = verify_token(id_token)

    if id_info is None or not "sub" in id_info:
        raise APIAuthError("Invalid Token")
    
    if id_info["email_verified"] is False:
        raise APIAuthError("User email not verified by Google")

    is_empty = len(User.query.all()) == 0
    user = User.query.filter_by(sub=id_info["sub"]).first()

    if not user:
        user = User(
            sub=id_info["sub"], 
            name=id_info["name"], 
            email=id_info["email"], 
            profile_pic=id_info["picture"], 
            is_admin=True if is_empty else False,
            is_authorized=True if is_empty else False
        )
        db.session.add(user)
        db.session.commit()

    return user_schema.dumps(user)
