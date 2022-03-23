import sys
import librosa
import librosa.display as disp
import matplotlib.pyplot as plt

def show_spectrogram(audio_path: str, ysup: int = 1000) -> None:
    # audio time series, sample_rate
    y, sr = librosa.load(audio_path)

    # short-time Fourier transform
    S = librosa.stft(y)

    data = librosa.amplitude_to_db(abs(S))

    # visualization
    disp.specshow(data, sr=sr, x_axis="time", y_axis="hz")
    plt.colorbar()
    plt.ylim(0, ysup)
    plt.show()

if __name__ == "__main__":
    show_spectrogram(*sys.argv[1:])
