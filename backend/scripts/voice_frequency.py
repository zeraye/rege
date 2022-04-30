import sys
import librosa
import numpy as np


def voice_frequency(audio_path: str, sr: int = 1000, sr_scalar: int = 22, deno: int = 30, freqdiff: int = 13, freqmin: int = 65) -> float:
    y, _ = librosa.load(audio_path, sr=sr)
    y_fourier = librosa.stft(y, n_fft=1024)
    data = librosa.amplitude_to_db(abs(y_fourier))
    more_sr = False

    minval = max(np.amax(data, axis=0)) / deno
    data = np.clip(data, minval, None)
    data -= minval

    if np.cumsum(data).any() == 0:
        y, sr = librosa.load(audio_path, sr=sr*sr_scalar)
        y_fourier = librosa.stft(y, n_fft=1024)
        data = librosa.amplitude_to_db(abs(y_fourier))
        more_sr = True

        minval = max(np.amax(data, axis=0)) * 2
        data += minval
        data = np.clip(data, 0, None)

    for i in range(data.shape[1]):
        col = data[:, i]

        for i in range(len(col)-1):
            if col[i] > 0:
                cumsum = 0

                for j in range(len(col)-1):
                    if col[i+j] <= 0:
                        col[i + j//2] = int(cumsum / j)
                        break

                    cumsum += col[i+j]
                    col[i+j] = 0

    data = data.tolist()

    decibels = []
    freqs = []

    for i in range(len(data)):
        if sum(data[i]) > 0:
            decibels.append(sum(data[i]))
            if more_sr:
                freqs.append(i*sr_scalar)
            else:
                freqs.append(i)

    if len(decibels) == 0:
        return 0

    counter = 0

    freq_db_over_zero = [[(freqs[0], decibels[0])]]

    for i in range(1, len(freqs)):
        if abs(freqs[i]-freq_db_over_zero[counter][-1][0]) >= freqdiff:
            counter += 1
            freq_db_over_zero.append([])

        freq_db_over_zero[counter].append((freqs[i], decibels[i]))

    wght_avges = []

    for fds in freq_db_over_zero:
        avgs = [fd[0] for fd in fds]
        wghs = [fd[1] for fd in fds]
        wght_avge = 0

        for i in range(len(avgs)):
            wght_avge += avgs[i] * wghs[i]

        wght_avge /= sum(wghs)
        wght_avges.append(wght_avge)

    for i in range(len(wght_avges)):
        if sr / 2 > wght_avges[i] > freqmin:
            return wght_avges[i]

    return sr / 2


if __name__ == "__main__":
    voice_frequency(*sys.argv[1:])
