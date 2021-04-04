from flask import Blueprint, jsonify, current_app, g, request
from automation.utils import login_required, authorization_required
from automation.error import APIError
from miio import Vacuum

vacuum = Blueprint('vacuum', __name__, url_prefix='/api/vacuum')


@vacuum.route("/status")
@login_required
@authorization_required
def get_info():
    return jsonify(get_vacuum().status().__dict__)


@vacuum.route("/roomclean", methods=["POST"])
@login_required
@authorization_required
def start_segment_clean():
    room_map = {
        1: "Kitchen",
        3: "Work",
        6: "Bathroom",
        7: "Bedroom",
        17: "Corridor",
        18: "Living Room",
    }

    if not request.json or not 'room' in request.json:
        raise APIError("Argument Not found: room")

    room = request.json.get('room')

    val_list = list(room_map.values())
    key_list = list(room_map.keys())

    if not room in val_list:
        raise APIError(f"Invalid Room: {room}")

    position = val_list.index(room)
    # print(key_list[position])

    get_vacuum().segment_clean([key_list[position]])
    # print(get_vacuum().get_segment_status())

    return jsonify({"Response": "Ok"})


@vacuum.route("/roomclean/stop", methods=["POST"])
@login_required
@authorization_required
def stop_segment_clean():
    get_vacuum().stop_segment_clean()
    return jsonify({"Response": "Stopped"})

# def start():
# def pause():
# def go_home():
# def consumables():
# def history():
# def last_clean_info():
# def clean_details():
# def set_fan_speed():
# def fan_speed(): fan_speed_presets



def get_vacuum():
    if 'vacuum' not in g:
        g.vacuum = Vacuum(current_app.config["VACUUM_IP"], current_app.config["VACUUM_TOKEN"])

    return g.vacuum