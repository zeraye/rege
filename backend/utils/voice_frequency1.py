from . import sys, np, librosa


def check_if_harmonic(
    data: np.ndarray,
    column: int,
    line: int,
    threshold: float,
    depth: int = 3,
    inaccuracy: int = 3,
) -> bool:
    for i in range(2, depth):
        start = line * i - inaccuracy
        end = line * i + inaccuracy
        spike_found = False
        for j in range(start, end):
            if data[j, column] > threshold:
                spike_found = True
                break
        if not spike_found:
            return False
    return True


def first_harmonics(
    audio_path: str, check_depth: int = 5, n_fft: int = 2048
) -> np.ndarray:
    # load file
    wave, sr = librosa.load(audio_path, sr=22050)

    # used later for translation
    frequencies_per_bin = sr / n_fft

    # get amplitude by frequency
    data = librosa.stft(wave, n_fft=n_fft)
    data = librosa.amplitude_to_db(abs(data))

    # create the array of first harmonics
    harmonics = np.zeros(shape=(data.shape[1]))

    # get threshold amplitudes for each column
    thresholds = data.max(axis=0) / 2

    # check one by one every frequency bin for first harmonic criteria
    for column in range(1, data.shape[1]):
        for line in range(2, int(data.shape[0] / check_depth - 1)):
            # is it a spike?
            if (
                data[line, column] > thresholds[column] / 2
                and data[line, column] >= data[line - 1, column]
                and data[line, column] >= data[line + 1, column]
            ):
                # are there consecutive harmonics?
                if check_if_harmonic(
                    data=data,
                    column=column,
                    line=line,
                    threshold=thresholds[column],
                    depth=check_depth,
                ):
                    harmonics[column] = line * frequencies_per_bin
                    break
    return harmonics


# possibly terribly inefficient, idk, idc, I hate Python
def values_in_range(data: np.ndarray, min: float, max: float) -> np.ndarray:
    # count values in range
    count = 0
    for i in range(1, data.size):
        if data[i] >= min and data[i] <= max:
            count = count + 1

    # write counted values to a new array
    out = np.zeros(shape=(count))
    count = 0
    for i in range(1, data.size):
        if data[i] >= min and data[i] <= max:
            out[count] = data[i]
            count = count + 1
    return out


def voice_frequency(audio_path: str) -> float:
    data = values_in_range(data=first_harmonics(audio_path=audio_path), min=60, max=500)
    if data.size == 0:
        return 0
    return np.median(data)


if __name__ == "__main__":
    voice_frequency(*sys.argv[1:])
