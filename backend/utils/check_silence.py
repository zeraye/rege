from . import librosa, np


def check_silence(audio_path: str) -> bool:
    y, _ = librosa.load(audio_path)
    y_fourier = librosa.stft(y, n_fft=1024)
    data = librosa.amplitude_to_db(abs(y_fourier))

    for i in range(data.shape[0]):
        for j in range(data.shape[1]):
            if data[i][j] < 0:
                data[i][j] = 0

    return np.sum(data) < 500
