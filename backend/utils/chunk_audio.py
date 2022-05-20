from . import pydub


def chunk_audio(audio_path: str, chunk_length_ms: int = 500) -> list:
    audio = pydub.AudioSegment.from_file(audio_path, "wav")
    chunks = pydub.utils.make_chunks(audio, chunk_length_ms)

    created_files = []

    for i, chunk in enumerate(chunks):
        chunk.export(f"{audio_path}{i}chunked.wav", format="wav")
        created_files.append(f"{audio_path}{i}chunked.wav")

    return created_files
