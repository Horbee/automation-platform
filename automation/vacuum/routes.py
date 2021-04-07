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
    # Segment list we will get from the timer
    rooms = [{"id":19,"name":"Kitchen"},{"id":16,"name":"Living Room"},{"id":18,"name":"Work"},{"id":17,"name":"Corridor"},{"id":20,"name":"Bathroom"},{"id":21,"name":"Bedroom"}]
   
    if not request.json or not 'room' in request.json:
        raise APIError("Argument Not found: room")

    room_name = request.json.get('room')

    room_id = next((room["id"] for room in rooms if room["name"] == room_name), None)

    if room_id is None:
        raise APIError(f"Invalid Room: {room}")

    get_vacuum().segment_clean([room_id])

    return jsonify({"Response": "Ok"})


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