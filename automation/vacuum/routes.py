import pydash as _

from flask import Blueprint, jsonify, current_app, g, request
from automation.utils import login_required, google_login_required, authorization_required
from automation.error import APIError
from automation.vacuum.responses import dialogflow_response
from miio import Vacuum

vacuum = Blueprint('vacuum', __name__, url_prefix='/api/vacuum')
# Segment list we will get from the timer
rooms = [{"id":19,"name":"Kitchen"},{"id":16,"name":"Living Room"},{"id":18,"name":"Work"},{"id":17,"name":"Corridor"},{"id":20,"name":"Bathroom"},{"id":21,"name":"Bedroom"}]
fan_speed_values = [{"value": 101, "name": "Silent"}, {"value": 102, "name": "Standard"}, {"value": 103, "name": "Medium"}, {"value": 104, "name": "Turbo"}, {"value": 105, "name": "Gentle"}]


@vacuum.route("/status")
@login_required
@authorization_required
def get_info():
    return jsonify(get_vacuum().status().__dict__)


@vacuum.route("/assistant", methods=["POST"])
@google_login_required
def process_assistant_intent():
    intent = _.get(request.json, 'queryResult.intent.displayName')

    if intent == "clean":
        room_names = _.get(request.json, 'queryResult.parameters.rooms')
        if not room_names:
            return dialogflow_response("Argument Not found or Empty: rooms")

        room_ids = [room["id"] for room in rooms if room["name"].lower() in set(room_names)]

        if not room_ids:
            return dialogflow_response(f"Invalid Rooms: {room_names}")

        current_app.logger.debug(f"Start segment cleaning from Assistant: {room_ids}")
        get_vacuum().segment_clean(room_ids)

        return dialogflow_response(f"Ok, {room_names} will be cleaned.")
    elif intent == "fan speed":
        fan_speed = _.get(request.json, 'queryResult.parameters.fan_speed')
        if fan_speed is None:
            return dialogflow_response("Argument Not found or Empty: fan_speed")
        
        value = next((speed["value"] for speed in fan_speed_values if (speed["name"]).lower() == fan_speed.lower()), None)
        if value is None:
            return dialogflow_response(f"Invalid speed name: {fan_speed}")

        current_app.logger.debug(f"Setting fan speed from Assistant: {fan_speed}, {value}")
        get_vacuum().set_fan_speed(value)
        return dialogflow_response(f"Okay, fan speed is now set to {value}.")
    elif intent == "status":
        status = get_vacuum().status()
        return dialogflow_response(f"Vacuum's battery is at {status.battery} and currently {status.state}")
    else:
        return dialogflow_response(f"Unknown intent: {intent}")    


@vacuum.route("/roomclean", methods=["POST"])
@login_required
@authorization_required
def start_segment_clean():
    if not request.json or not 'room' in request.json:
        raise APIError("Argument Not found: room")

    room_name = request.json.get('room')

    room_id = next((room["id"] for room in rooms if (room["name"]).lower() == room_name.lower()), None)

    if room_id is None:
        raise APIError(f"Invalid Room: {room_name}")

    get_vacuum().segment_clean([room_id])

    return jsonify({"Response": f"Ok {room_id}"})


@vacuum.route("/roomclean/pause", methods=["POST"])
@login_required
@authorization_required
def pause():
    get_vacuum().pause()
    return jsonify({"Response": "Paused"})


@vacuum.route("/roomclean/home", methods=["POST"])
@login_required
@authorization_required
def home():
    get_vacuum().home()
    return jsonify({"Response": "Go Home"})


def get_vacuum():
    if 'vacuum' not in g:
        g.vacuum = Vacuum(current_app.config["VACUUM_IP"], current_app.config["VACUUM_TOKEN"])

    return g.vacuum