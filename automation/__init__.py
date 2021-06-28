import os

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from automation.config import Config
from flask_marshmallow import Marshmallow
from miio import Vacuum


basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(dotenv_path=os.path.join(basedir, '../.env'))

db = SQLAlchemy()
ma = Marshmallow()

vacuum_instance = None

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app)

    # Init db first, then Marshmallow
    db.init_app(app)
    with app.app_context():
        from automation.models import User
        db.create_all()
        
        import automation.error

    ma.init_app(app)

    global vacuum_instance
    vacuum_instance = Vacuum(app.config["VACUUM_IP"], app.config["VACUUM_TOKEN"])
    vacuum_instance.retry_count = 20
    vacuum_instance.timeout = 0.5

    from automation.auth.routes import auth
    from automation.user.routes import user
    from automation.vacuum.routes import vacuum
    app.register_blueprint(auth)
    app.register_blueprint(user)
    app.register_blueprint(vacuum)

    return app