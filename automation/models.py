from datetime import datetime
from automation import db, login_manager
from flask_login import UserMixin
from flask import jsonify


# Flask-Login helper to retrieve a user from our db
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True) 
    sub = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    admin = db.Column(db.Boolean, default=False)
    profile_pic = db.Column(db.String(1000))
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"User('{self.name}', '{self.email}', '{self.sub}')"

    def get_objects(self):
        data = {
            'id': self.id,
            'sub': self.sub,
            'email': self.email,
            'name': self.name,
            'admin': self.admin,
            'profile_pic': self.profile_pic,
            'joined_at': self.joined_at,
        }
        return data