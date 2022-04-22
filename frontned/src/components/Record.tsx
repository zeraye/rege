import { useState, useEffect, Fragment } from "react";
import Button from "@mui/material/Button";
import { useReactMediaRecorder } from "react-media-recorder";

const Record = ({ canNextHandler, fileHandler }: any) => {
  const [isRec, setIsRec] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {}
  );

  useEffect(() => {
    fileHandler(mediaBlobUrl);
  }, [mediaBlobUrl, fileHandler]);

  const recordingHandler = () => {
    if (isRec) {
      stopRecording();
      canNextHandler();
    } else {
      startRecording();
      canNextHandler(false);
    }
    setIsRec(!isRec);
  };

  return (
    <Fragment>
      <Button variant="contained" onClick={recordingHandler}>
        {isRec ? "Stop" : "Start"} recording
      </Button>
    </Fragment>
  );
};

export default Record;
