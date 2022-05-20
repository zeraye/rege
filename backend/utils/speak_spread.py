from . import os, chunk_audio, gender_recognition, check_silence
from typing import Tuple


def speak_spread(audio_path: str) -> Tuple[float, float, float]:
    files = chunk_audio(audio_path)

    male = 0
    female = 0
    silence = 0

    for file in files:
        if check_silence.check_silence(file):
            silence += 1
        elif gender_recognition(file) == "male":
            male += 1
        else:
            female += 1

        os.remove(file)

    total = male + female + silence

    if total == 0:
        return 0, 0, 100

    return male * 100 / total, female * 100 / total, silence * 100 / total
