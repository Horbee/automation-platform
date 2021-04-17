import sys
import traceback
from flask import current_app, jsonify, request
from automation.vacuum.responses import dialogflow_response
from miio import DeviceException
class APIError(Exception):
    """All custom API Exceptions"""
    code = 400
    description = "API Error"
    pass


class APIAuthError(APIError):
    """Custom Authentication Error Class."""
    code = 403
    description = "Authentication Error"


@current_app.errorhandler(DeviceException)
def handle_exception(err):
    current_app.logger.error(f"Miio Device Exception: {err}, route: {request.url}")
    
    if request.url.endswith("assistant"):
        return dialogflow_response(f"Device Exception Occured. Please try again later.")

    response = {"error": "Device Exception", "message": str(err)}
    return jsonify(response), 500


@current_app.errorhandler(APIError)
def handle_exception(err):
    """Return custom JSON when APIError raised"""
    response = {"error": err.description, "message": ""}
    if len(err.args) > 0:
        response["message"] = err.args[0]
    # Add some logging so that we can monitor different types of errors 
    current_app.logger.error(f"{err.description}: {response['message']}, route: {request.url}")
    return jsonify(response), err.code


@current_app.errorhandler(500)
def server_error(err):
    """Return JSON instead of HTML for any other server error"""
    current_app.logger.error(f"Unknown Exception: {str(err)}, route: {request.url}")
    current_app.logger.debug(''.join(traceback.format_exception(etype=type(err), value=err, tb=err.__traceback__)))
    response = {"title": "Unexpected Error", "error": "Server error occured."}
    return jsonify(response), 500