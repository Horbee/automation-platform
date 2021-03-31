from flask import Blueprint, jsonify, request, abort
from automation.utils import login_required, admin_login_required
from automation.models import User, user_schema, users_schema
from automation import db
from automation.error import APIError

user = Blueprint('user', __name__)


@user.route("/api/users")
@login_required
@admin_login_required
def get_users():
    users = User.query.all()
    return users_schema.dumps(users)


@user.route("/api/users/<int:user_id>", methods=['PUT'])
@login_required
@admin_login_required
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIError("User not found")

    if not request.json or not 'is_admin' in request.json or not 'is_authorized' in request.json:
        raise APIError("Not found: is_admin or is_authorized")

    if type(request.json['is_admin']) is not bool or type(request.json['is_authorized']) is not bool:
        raise APIError("Type error: is_admin or is_authorized")

    user.is_admin = request.json.get('is_admin')
    user.is_authorized = request.json.get('is_authorized')
    db.session.commit()

    user = User.query.get(user_id)
    return user_schema.dumps(user)


@user.route("/api/users/<int:user_id>", methods=['DELETE'])
@login_required
@admin_login_required
def delete_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        raise APIError("User not found")

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User: {user_id} deleted."})