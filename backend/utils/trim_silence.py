from . import librosa, soundfile


def trim_silence(audio_path: str) -> None:
    audio, sample_rate = librosa.load(audio_path)
    clip = librosa.effects.trim(audio, top_db=10)
    soundfile.write(audio_path, clip[0], sample_rate)
