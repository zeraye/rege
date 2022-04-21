import sys
import math
import librosa


def check_quality(audio_path: str, ysup: int = 1000) -> int:
    # audio time series, sample_rate
    y, sr = librosa.load(audio_path)

    # short-time Fourier transform
    S = librosa.stft(y)

    data = librosa.amplitude_to_db(abs(S))

    # create parameters
    MAX_FREQ = sr / 4
    FREQ_SCALAR = MAX_FREQ / data.shape[0]

    freqs = []
    dbs = []

    xmax = ysup
    ymax = -math.inf
    freq_ymax = None

    # extract sum of frequencies and decibels
    for i in range(int(data.shape[0] * (xmax / MAX_FREQ))):
        sumf = sum(data[i])
        freqs.append(i * FREQ_SCALAR)
        dbs.append(sumf)
        ymax = max(ymax, sumf)

        # find maximal top
        if ymax == sumf:
            freq_ymax = i * FREQ_SCALAR

    # calculate quality
    index_ymax = freqs.index(freq_ymax)
    abserr = dbs[index_ymax] - dbs[index_ymax-6]
    relerr = abs(abserr / dbs[index_ymax])
    quality = int(relerr*10)

    return quality


if __name__ == "__main__":
    check_quality(*sys.argv[1:])
