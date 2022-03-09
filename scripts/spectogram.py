import librosa
import librosa.display as disp
import matplotlib.pyplot as plt

def show_spectogram(filename):
    audio_path = f"../recordings/{filename}"

    # audio time series, sample_rate
    y, sr = librosa.load(audio_path)

    # short-time Fourier transform
    S = librosa.stft(y)

    data = librosa.amplitude_to_db(abs(S))

    # visualization
    disp.specshow(data, sr=sr, x_axis="time", y_axis="hz")
    plt.colorbar()
    plt.ylim(0, 1000)
    plt.show()

show_spectogram("male-discord-normal0.wav")
