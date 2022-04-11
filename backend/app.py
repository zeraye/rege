import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/rege", methods = ["POST"])
def home():
    print(request.data)

    with open("text.wav", "wb") as f:
        f.write(request.data)

    return json.dumps({"freq": "213.7 Hz"}), 200, {"ContentType": "application/json"}


if __name__ == "__main__":
    app.run()