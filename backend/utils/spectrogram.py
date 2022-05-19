from . import sys, io, librosa, matplotlib, plt, disp


def spectrogram(
    audio_path: str, ysup: int = 1000, show_plot: bool = True, dark_theme: bool = False
) -> bytes:
    # get audio time series and sample_rate
    audio_time_series, sample_rate = librosa.load(audio_path)

    # short-time Fourier transform
    stft_coefficients = librosa.stft(audio_time_series)

    plot = librosa.amplitude_to_db(abs(stft_coefficients))

    # it is used for dark background (exported image
    # has transparent background), thus letters should be white
    if dark_theme:
        matplotlib.rcParams["text.color"] = "white"
        matplotlib.rcParams["axes.labelcolor"] = "white"
        matplotlib.rcParams["xtick.color"] = "white"
        matplotlib.rcParams["ytick.color"] = "white"

    plot_object = io.BytesIO()

    disp.specshow(plot, sr=sample_rate, x_axis="time", y_axis="hz")

    plt.colorbar()

    plt.ylim(0, ysup)

    # save plot to BytesIO object
    plt.savefig(plot_object, format="png", transparent=True, bbox_inches="tight")

    if show_plot:
        plt.show()

    # without it plots overlap on each other
    plt.close()

    # get bytes from BytesIO object
    return plot_object.getvalue()


if __name__ == "__main__":
    spectrogram(*sys.argv[1:])
