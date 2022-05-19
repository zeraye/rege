from . import pydub


def convert_ogg_to_wav(audio_path: str) -> None:
    audio_file = pydub.AudioSegment.from_file(audio_path)
    audio_file.export(audio_path, format="wav")
