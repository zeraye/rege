from . import sys
from . import voice_frequency1 as pvf  # Pochmara's Voice Frequency Algorithm
from . import voice_frequency2 as rvf  # Rudnik's Voice Frequency Algorithm


def are_close(first: float, second: float, threshold: float) -> bool:
    return abs(first - second) <= threshold


def voice_frequency(
    path: str, proximity_treshold: float = 10, antiproximity_treshold: float = 200
) -> float:
    pochmara = pvf.voice_frequency(path)
    rudnik = rvf.voice_frequency(path)

    # check for clear mistakes
    if (pochmara < 50 or pochmara > 600) and (rudnik < 50 or rudnik > 600):
        return 0
    if pochmara < 50 or pochmara > 600:
        return rudnik
    if rudnik < 50 or rudnik > 600:
        return pochmara

    # check if they agree
    if are_close(pochmara, rudnik, proximity_treshold):
        return (pochmara + rudnik) / 2

    # check if one returned a multiple of the other's result
    # because then it probably just found a higher harmonic and the lower one is correct
    multiples = False
    for i in range(2, 5):
        if are_close(pochmara * i, rudnik, proximity_treshold) or are_close(
            pochmara, rudnik * i, proximity_treshold
        ):
            multiples = True
            break
    if multiples:
        return min(pochmara, rudnik)

    # they're both reasonable, both disagree and not multiples of each other

    # check if one is significantly lower, if so return it
    # otherwise return the average
    if are_close(pochmara, rudnik, antiproximity_treshold):
        return (pochmara + rudnik) / 2
    return min(pochmara, rudnik)


if __name__ == "__main__":
    voice_frequency(*sys.argv[1:])
