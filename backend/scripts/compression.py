import sys
import os
import zipfile
import numpy as np
import librosa


def compression(audio_path: str, sr: int = 1000) -> object:
    size = os.path.getsize(audio_path)

    # Phase 1
    y, sr = librosa.load(audio_path, sr=sr)

    S = librosa.stft(y, n_fft=1024)

    data = librosa.amplitude_to_db(abs(S))

    np.save(audio_path[:-4], data)

    p1 = os.path.getsize(audio_path[:-4] + ".npy")

    # Phase 2
    minval = max(np.amax(data, axis=0))/3

    data = np.clip(data, minval, None)

    data -= minval

    data = data.astype("uint8")

    np.save(audio_path[:-4], data)

    p2 = os.path.getsize(audio_path[:-4] + ".npy")

    # Phase 3
    for i in range(data.shape[1]):
        col = data[:, i]

        for i in range(len(col)):
            if col[i] > 0:
                cumsum = 0
                for j in range(len(col)-1):
                    if col[i+j] <= 0:
                        col[i + j//2] = int(cumsum / j)
                        break
                    cumsum += col[i+j]
                    col[i+j] = 0

    np.save(audio_path[:-4], data)

    p3 = os.path.getsize(audio_path[:-4] + ".npy")

    # Phase 4
    with zipfile.ZipFile(audio_path[:-4] + ".rgc", 'w', zipfile.ZIP_DEFLATED) as file:
        file.write(audio_path[:-4] + ".npy")

    os.remove(audio_path[:-4] + ".npy")

    p4 = os.path.getsize(audio_path[:-4] + ".rgc")

    os.remove(audio_path[:-4] + ".rgc")

    ratio = round(((size-p4)/size)*100, 2)

    return {"name": audio_path, "size": size, "p1": p1, "p2": p2, "p3": p3, "p4": p4, "ratio": ratio}


if __name__ == "__main__":
    compression(*sys.argv[1:])
