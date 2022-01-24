from flask import Blueprint, jsonify, request
from automation.utils import login_required, admin_login_required
from automation.models import Room, room_schema, rooms_schema
from automation import db
from automation.error import APIError

room = Blueprint('room', __name__, url_prefix='/api/rooms')


@room.route("", methods=['GET', 'POST'])
@login_required
@admin_login_required
def rooms_viewset():
    if request.method == "GET":
        rooms = Room.query.all()
        return rooms_schema.dumps(rooms)
    
    if request.method == "POST":
        required_args = ['name', 'room_id', 'is_active']
        missing = [arg for arg in required_args if not arg in request.json]
        if not request.json or len(missing) > 0:
            raise APIError(f"Not found: {missing}")

        name = request.json.get('name')
        room_id = request.json.get('room_id')
        is_active = request.json.get('is_active')

        new_room = Room(
            name=name, 
            room_id=room_id,
            is_active=is_active
        )
        db.session.add(new_room)
        db.session.commit()

        return room_schema.dumps(new_room)


@room.route("/<int:id>", methods=['GET', 'PUT', 'DELETE'])
@login_required
@admin_login_required
def room_viewset(id):
    room = Room.query.get(id)
    if room is None:
        raise APIError(f"Room with id: {id} not found")

    if request.method == "GET":
        return room_schema.dumps(room)


    if request.method == "PUT":
        required_args = ['name', 'room_id', 'is_active']
        missing = [arg for arg in required_args if not arg in request.json]
        if not request.json or len(missing) > 0:
            raise APIError(f"Not found: {missing}")
        
        room.name = request.json.get('name')
        room.room_id = request.json.get('room_id')
        room.is_active = request.json.get('is_active')

        db.session.commit()
        return room_schema.dumps(room)
     

    if request.method == "DELETE":
        db.session.delete(room)
        db.session.commit()
        return jsonify({"message": f"Room with id: {id} deleted."})
