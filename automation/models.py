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


class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(1000), nullable=False)
    room_id = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Room('{self.name}', '{self.room_id}', '{self.is_active}')"

class RoomSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Room


room_schema = RoomSchema()
rooms_schema = RoomSchema(many=True)