import os
import json
import uuid
import threading

from flask import Flask, request, abort
from flask_cors import CORS

from cloudinary import config
from cloudinary.uploader import upload
from cloudinary.api import delete_resources_by_tag

from scripts.spectrogram import show_spectrogram

from scripts.quality import check_quality
from scripts.voice_frequency import voice_frequency
from scripts.p_extract import voice_frequency as voice_frequency2

import pydub
import librosa
import soundfile

from dotenv import load_dotenv

load_dotenv()

config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

app = Flask(__name__)

CORS(app)


def convert_ogg_to_wav(audio_path):
    song = pydub.AudioSegment.from_file(audio_path)
    song.export(audio_path, format="wav")


@app.route("/rege", methods=["POST"])
def rege():
    uid = uuid.uuid4().hex
    audiopath = f"temp/{uid}.wav"
    figurepath = f"figures/{uid}.png"

    with open(audiopath, "wb") as f:
        f.write(request.data)

    convert_ogg_to_wav(audiopath)

    # trim silence
    audio, sr = librosa.load(audiopath)
    clip = librosa.effects.trim(audio, top_db=10)
    soundfile.write(audiopath, clip[0], sr)

    try:
        frequency = int(voice_frequency(audiopath))
        frequency2 = int(voice_frequency2(audiopath))
        quality = check_quality(audiopath)
        show_spectrogram(audiopath, save=True)
        figureURL = upload(figurepath, tags=uid)["secure_url"]
    except Exception as e:
        print(e)
        abort(400)

    os.remove(audiopath)
    os.remove(figurepath)
    threading.Timer(3600, delete_resources_by_tag, [uid]).start()

    return json.dumps({"frequencyRudnik": frequency,
                       "frequencyPochmara": frequency2,
                       "quality": quality,
                       "figureURL": figureURL}), 200, {"ContentType": "application/json"}

@app.route("/regeSearch", methods=["POST"])
def search():
    return json.dumps([ {"filename": "test1",
                        "source": "debug",
                        "gender": "apache heli",
                        "frequency": 69 },
                        {"filename": "test2",
                        "source": "debug",
                        "gender": "apache heli",
                        "frequency": 420 },
                        {"filename": "test3",
                        "source": "debug",
                        "gender": "apache heli",
                        "frequency": 2137 },
                        {"filename": "test4",
                        "source": "debug",
                        "gender": "apache heli",
                        "frequency": 71830 },
                        {"filename": "test5",
                        "source": "debug",
                        "gender": "apache heli",
                        "frequency": 5318008 } ])

if __name__ == "__main__":
    app.run(debug=True)
