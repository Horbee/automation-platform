from flask import jsonify

def dialogflow_response(text_response):
    return jsonify(
            {
            "payload": {
                "google": {
                "expectUserResponse": True,
                "richResponse": {
                    "items": [
                    {
                        "simpleResponse": {
                        "textToSpeech": text_response,
                        "displayText": text_response
                        }
                    }
                    ]
                }
                }
            }
            }
    )