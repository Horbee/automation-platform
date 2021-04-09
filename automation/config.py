import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or os.urandom(24)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, '../db.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    GOOGLE_ASSISTANT_CLIENT_ID = os.environ.get("GOOGLE_ASSISTANT_CLIENT_ID", None)
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
    GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
    CORS_ORIGINS = ["http://localhost:3000"]
    VACUUM_IP = os.environ.get("VACUUM_IP", None)
    VACUUM_TOKEN = os.environ.get("VACUUM_TOKEN", None)