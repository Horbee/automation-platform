import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or os.urandom(24)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.sqlite'
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
    GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
    CORS_ORIGINS = ["http://localhost:3000"]