from . import voice_frequency3

# frequency ranges of male female according to
# https://www.axiomaudio.com/blog/audio-oddities-frequency-ranges-of-male-female-and-childrens-voices/
def gender_recognition(audio_path: str) -> str:
    frequency = voice_frequency3.voice_frequency(audio_path)

    if frequency > 160:
        return "female"

    return "male"
