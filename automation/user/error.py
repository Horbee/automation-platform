from flask import current_app, jsonify
from automation.user.routes import user


class APIError(Exception):
    """All custom API Exceptions"""
    pass


class APIUserError(APIError):
    """Custom Error Class for User resource."""
    code = 400
    description = "User Error"


@user.errorhandler(APIError)
def handle_exception(err):
    """Return custom JSON when APIError or its children are raised"""
    response = {"error": err.description, "message": ""}
    if len(err.args) > 0:
        response["message"] = err.args[0]
    # Add some logging so that we can monitor different types of errors 
    current_app.logger.error(f"{err.description}: {response['message']}")
    return jsonify(response), err.code


@user.errorhandler(500)
def handle_exception(err):
    """Return JSON instead of HTML for any other server error"""
    current_app.logger.error(f"Unknown Exception: {str(err)}")
    current_app.logger.debug(''.join(traceback.format_exception(etype=type(err), value=err, tb=err.__traceback__)))
    response = {"error": "Sorry, that error is on us, please contact support if this wasn't an accident"}
    return jsonify(response), 500