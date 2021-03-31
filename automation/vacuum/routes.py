from flask import Blueprint, jsonify, current_app, g
from automation.utils import login_required, authorization_required
from miio import Vacuum

vacuum = Blueprint('vacuum', __name__)


@vacuum.route("/api/vacuum/info")
@login_required
@authorization_required
def get_info():
    return jsonify(str(get_vacuum().info()))

# def start():
# def pause():
# def go_home():
# def status():
# def consumables():
# def history():
# def last_clean_info():
# def clean_details():
# def set_fan_speed():
# def fan_speed(): fan_speed_presets
# def start_segment_clean(): 
# def stop_segment_clean(): 



def get_vacuum():
    if 'vacuum' not in g:
        g.vacuum = Vacuum(current_app.config["VACUUM_IP"], current_app.config["VACUUM_TOKEN"])

    return g.vacuum