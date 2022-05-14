import os
import json
import uuid
import threading
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from cloudinary import config
from cloudinary.uploader import upload
from cloudinary.api import delete_resources_by_tag
import utils

load_dotenv()

config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET"),
)

app = Flask(__name__)

CORS(app)


@app.route("/rege/analyse", methods=["POST"])
def analyse():
    uid = uuid.uuid4().hex

    audio_path = f"temp/{uid}.wav"

    with open(audio_path, "wb") as file:
        file.write(request.data)

    utils.convert_ogg_to_wav(audio_path)

    utils.trim_silence(audio_path)

    frequency = utils.voice_frequency3(audio_path)

    plot_object = utils.spectrogram(audio_path, show_plot=False, dark_theme=True)

    plot_url = upload(plot_object, tags=uid)["secure_url"]

    gender = utils.gender_recognition(audio_path)

    os.remove(audio_path)

    threading.Timer(300, delete_resources_by_tag, [uid]).start()

    return (
        json.dumps(
            {
                "frequency": int(frequency),
                "figureURL": plot_url,
                "gender": gender,
            }
        ),
        200,
        {"ContentType": "application/json"},
    )


@app.route("/rege/search", methods=["POST"])
def search():
    params = json.loads(request.data.decode("utf8"))

    recordings, count = utils.search_recordings(params)

    return json.dumps({"recordings": recordings, "count": count})


if __name__ == "__main__":
    app.run(debug=True)
