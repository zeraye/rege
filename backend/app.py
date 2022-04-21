import json
import uuid
import os
from flask import Flask, request, abort
from flask_cors import CORS
from scripts.voice_frequency import voice_frequency

app = Flask(__name__)

CORS(app)


@app.route("/rege", methods=["POST"])
def rege():
    uid = uuid.uuid4().hex

    with open(f"temp/{uid}.wav", "wb") as f:
        f.write(request.data)

    try:
        freq0 = voice_frequency(f"temp/{uid}.wav")
    except:
        os.remove(f"temp/{uid}.wav")
        abort(400)

    os.remove(f"temp/{uid}.wav")

    return json.dumps({"freq0": str(round(freq0, 2)) + " Hz", "freq1": "Algorithm not implemented yet!"}), 200, {"ContentType": "application/json"}


if __name__ == "__main__":
    app.run()
