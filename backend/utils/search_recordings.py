from . import json
from typing import Dict, List, Union, Tuple


def validate_recording(
    recording: Dict[str, Union[str, int]],
    params: Dict[str, Union[str, List[int]]],
) -> bool:
    if params["source"] != "all" and recording["source"] != params["source"]:
        return False

    if params["gender"] != "all" and recording["gender"] != params["gender"]:
        return False

    if (
        params["frequencyRange"][0] > recording["frequency"]
        or recording["frequency"] > params["frequencyRange"][1]
    ):
        return False

    return True


def search_recordings(
    params: Dict[str, Union[str, List[int]]],
) -> Tuple[List[Dict[str, Union[str, int]]], int]:
    with open("database/recordings.json") as file:
        data = json.load(file)

    valid_recordigs = []

    valid_recordigs = list(
        filter(
            lambda recording: validate_recording(recording, params), data["recordings"]
        )
    )

    return valid_recordigs[
        params["recordingsRange"][0] : params["recordingsRange"][1] + 1
    ], len(valid_recordigs)
