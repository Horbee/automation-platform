import os

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from automation.config import Config
from flask_marshmallow import Marshmallow

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(dotenv_path=os.path.join(basedir, '../.env'))

db = SQLAlchemy()
ma = Marshmallow()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app)

    # Init db first, then Marshmallow
    db.init_app(app)
    with app.app_context():
        from automation.models import User
        db.create_all()

    ma.init_app(app)

    from automation.auth.routes import auth
    from automation.user.routes import user
    app.register_blueprint(auth)
    app.register_blueprint(user)

    return app