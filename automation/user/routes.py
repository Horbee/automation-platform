from flask import Blueprint, jsonify, request
from automation.utils import login_required, admin_login_required
from automation.models import User
from automation import db

user = Blueprint('user', __name__)
from automation.user.error import APIUserError


@user.route("/api/users")
@login_required
@admin_login_required
def get_users():
    users = User.query.all()

    users[:] = [user.get_objects() for user in users]

    return jsonify(users)


@user.route("/api/users/<int:user_id>", methods=['PUT'])
@login_required
@admin_login_required
def update_user(user_id):
    user = User.query.get(user_id)
    
    if user is None:
        raise APIUserError("User not found")

    if not request.json or not 'admin' in request.json or not 'authorized' in request.json:
        raise APIUserError("Not found: admin or authorized")

    if type(request.json['admin']) is not bool or type(request.json['authorized']) is not bool:
        raise APIUserError("Type error: admin or authorized")

    user.is_admin = request.json.get('admin')
    user.is_authorized = request.json.get('authorized')

    db.session.commit()

    user = User.query.get(user_id)
    return jsonify(user.get_objects())


@user.route("/api/users/<int:user_id>", methods=['DELETE'])
@login_required
@admin_login_required
def delete_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        raise APIUserError("User not found")

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User: {user_id} deleted."})