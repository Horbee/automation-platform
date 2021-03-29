import os

from flask import Flask
from flask_cors import CORS
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
    
    CORS(app)

    db.init_app(app)
    with app.app_context():
        from automation.models import User
        db.create_all()

    login_manager.init_app(app)

    from automation.auth.routes import auth
    from automation.user.routes import user
    app.register_blueprint(auth)
    app.register_blueprint(user)

    return app