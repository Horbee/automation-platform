import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_login import LoginManager
from oauthlib.oauth2 import WebApplicationClient
from automation.config import Config


load_dotenv()

db = SQLAlchemy()
login_manager = LoginManager()


client = WebApplicationClient(Config.GOOGLE_CLIENT_ID)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    with app.app_context():
        from automation.models import User
        db.create_all()

    login_manager.init_app(app)

    from automation.routes import auth
    app.register_blueprint(auth)

    return app