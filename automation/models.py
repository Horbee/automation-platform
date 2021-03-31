from datetime import datetime
from automation import db, ma


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    sub = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(1000), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    is_authorized = db.Column(db.Boolean, default=False)
    profile_pic = db.Column(db.String(1000))
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"User('{self.name}', '{self.email}', '{self.sub}')"

# Marshmallow Schema
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


user_schema = UserSchema()
users_schema = UserSchema(many=True)