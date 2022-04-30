import { useEffect, Fragment } from "react";
import Button from "@mui/material/Button";
import { useReactMediaRecorder } from "react-media-recorder";

const Record = ({ canNextHandler, fileHandler }: any) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({});

  useEffect(() => {
    fileHandler(mediaBlobUrl);
  }, [mediaBlobUrl, fileHandler]);

  const recordingHandler = () => {
    if (status === "recording") {
      stopRecording();
      canNextHandler();
    } else if (status === "idle" || status === "stopped") {
      startRecording();
      canNextHandler(false);
    }
  };

  return (
    <Fragment>
      <Button variant="contained" onClick={recordingHandler}>
        {status === "recording" ? "Stop" : "Start"} recording
      </Button>
    </Fragment>
  );
};

export default Record;
