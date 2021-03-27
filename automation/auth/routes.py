from flask import Blueprint, jsonify, request, g
from automation import db
from automation.utils import verify_token, login_required, admin_login_required, authorization_required
from automation.models import User

auth = Blueprint('auth', __name__)


@auth.route("/api/login", methods=['POST'])
def login():
    # return User data to user or register user
    if not request.json or not 'idToken' in request.json:
        abort(Response("idToken not found"))
    
    id_token = request.json['idToken']
    id_info = verify_token(id_token)

    if id_info is None or not "sub" in id_info:
        abort(Response("Invalid Token"))   
    
    if id_info["email_verified"] is False:
        abort(Response("User email not verified by Google"))

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

    return jsonify(user.get_objects())


@auth.route("/api/test", methods=['GET'])
@login_required
def test():
   return jsonify({"success": True, "user": g.user.get_objects()}) 


@auth.route("/api/admin", methods=['GET'])
@login_required
@admin_login_required
def test_admin():
   return jsonify({"success": True, "user": g.user.get_objects()}) 


@auth.route("/api/authorization", methods=['GET'])
@login_required
@authorization_required
def test_authorization():
   return jsonify({"success": True, "user": g.user.get_objects()}) 