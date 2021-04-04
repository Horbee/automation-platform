from flask import Blueprint, current_app

client = Blueprint('client', __name__)

@client.route('/')
def index():
    return current_app.send_static_file('index.html')