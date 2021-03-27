from flask import Blueprint, jsonify, request
from automation.utils import verify_token

auth = Blueprint('auth', __name__)


@auth.route("/api/login", methods=['POST'])
def login():
    if not request.json or not 'idToken' in request.json:
        abort(400)
    
    id_token = request.json['idToken']

    if verify_token(id_token):
        return jsonify({"success": True})    
    
    return jsonify({"success": False})    
