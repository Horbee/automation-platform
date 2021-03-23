import json
import requests

from flask import redirect, request, url_for, render_template, Blueprint, current_app
from flask_login import (
    current_user,
    login_required,
    login_user,
    logout_user,
)
from automation import login_manager, client, db
from automation.models import User


auth = Blueprint('auth', __name__)

@auth.route("/")
def index():
    return render_template("index.html", current_user=current_user)


@auth.route("/login")
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]
    
    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)


@auth.route("/login/callback")
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )

    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(current_app.config["GOOGLE_CLIENT_ID"], current_app.config["GOOGLE_CLIENT_SECRET"]),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    is_empty = len(User.query.all()) == 0

    # Find user in db
    user = User.query.filter_by(sub=unique_id).first()

    # Doesn't exist? Add it to the database.
    if not user:
        user = User(
            sub=unique_id, 
            name=users_name, 
            email=users_email, 
            profile_pic=picture, 
            admin=True if is_empty else False
        )
        db.session.add(user)
        db.session.commit()
        
    # Begin user session by logging the user in
    login_user(user)

    # Send user back to homepage
    return redirect(url_for("auth.index"))


@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("auth.index"))


def get_google_provider_cfg():
    return requests.get(current_app.config["GOOGLE_DISCOVERY_URL"]).json()


