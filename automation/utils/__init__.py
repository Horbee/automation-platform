from google.oauth2 import id_token
from google.auth.transport import requests
from automation import Config

def verify_token(token):
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), Config.GOOGLE_CLIENT_ID)
        userid = idinfo['sub']
        print(userid)
    except ValueError:
        # Invalid token
        print("Invalid Token")
        pass