import { Fragment } from "react";

import Button from "@mui/material/Button";
import UploadAudio from "./UploadAudio";
import RecordAudio from "./RecordAudio";

const RecordAndUpload = ({
  canNextHandler,
  fileHandler,
  sceneHandler,
  canNext,
}: any) => {
  return (
    <Fragment>
      <UploadAudio canNextHandler={canNextHandler} fileHandler={fileHandler} />
      <RecordAudio canNextHandler={canNextHandler} fileHandler={fileHandler} />
      <Button
        variant="contained"
        disabled={canNext ? false : true}
        onClick={() => sceneHandler("recordAndUpload", "analyse")}
      >
        Check frequency
      </Button>
    </Fragment>
  );
};

export default RecordAndUpload;
