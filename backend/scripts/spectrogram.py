import sys
import librosa
import librosa.display as disp
import matplotlib.pyplot as plt
import matplotlib
import sys


def show_spectrogram(audio_path: str, ysup: int = 1000, save: bool = False) -> None:
    # audio time series, sample_rate
    y, sr = librosa.load(audio_path)

    # short-time Fourier transform
    S = librosa.stft(y)

    data = librosa.amplitude_to_db(abs(S))

    # visualization
    color = "white" if save else "black"
    matplotlib.rcParams['text.color'] = color
    matplotlib.rcParams['axes.labelcolor'] = color
    matplotlib.rcParams['xtick.color'] = color
    matplotlib.rcParams['ytick.color'] = color

    disp.specshow(data, sr=sr, x_axis="time", y_axis="hz")
    plt.colorbar()
    plt.ylim(0, ysup)
    if save:
        plt.savefig(
            f"figures/{audio_path.split('/')[-1][:-4]}.png", transparent=True, bbox_inches="tight")
    else:
        plt.show()
    plt.close()


if __name__ == "__main__":
    show_spectrogram(*sys.argv[1:])
