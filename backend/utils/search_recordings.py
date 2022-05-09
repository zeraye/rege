from . import json, typing


def validate_recording(
    recording: typing.Dict[str, typing.Union[str, int]],
    params: typing.Dict[str, typing.Union[str, typing.List[int]]],
) -> bool:
    if params["source"] != "all" and recording["source"] != params["source"]:
        return False

    if params["gender"] != "all" and recording["gender"] != params["gender"]:
        return False

    if (
        params["frequency"][0] > recording["frequency"]
        or recording["frequency"] > params["frequency"][1]
    ):
        return False

    return True


def search_recordings(
    params: typing.Dict[str, typing.Union[str, typing.List[int]]],
) -> typing.Tuple[typing.List[typing.Dict[str, typing.Union[str, int]]], int]:
    with open("database/recordings.json") as file:
        data = json.load(file)

    valid_recordigs = []

    valid_recordigs = list(
        filter(
            lambda recording: validate_recording(recording, params), data["recordings"]
        )
    )

    return valid_recordigs[params["range"][0] : params["range"][1] + 1], len(
        valid_recordigs
    )
