import { Fragment } from 'react';

import Button from '@mui/material/Button';
import UploadAudio from './UploadAudio';
import RecordAudio from './RecordAudio';

import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

import { Page } from '../../App';

interface RecordAndUploadProps {
  file: File | undefined;
  pageHandler: (pageTo: Page) => void;
  fileHandler: (file: File) => void;
  mediaBlobUrlHandler: (mediaBlobUrl: string) => void;
}

const RecordAndUpload = ({
  file,
  pageHandler,
  fileHandler,
  mediaBlobUrlHandler,
}: RecordAndUploadProps) => {
  const mediaBlobUrlToFile = async (newMediaBlobUrl: string) => {
    return await fetch(newMediaBlobUrl)
      .then((response) => response.blob())
      .then(
        (blobFile) =>
          new File([blobFile], 'recording.wav', { type: 'audio/wav' })
      );
  };

  const recordingHandler = (recording: File | string) => {
    if (typeof recording === 'string') {
      mediaBlobUrlToFile(recording).then((file) => fileHandler(file));
      mediaBlobUrlHandler(recording);
    } else if (recording instanceof File) {
      fileHandler(recording);
      mediaBlobUrlHandler(URL.createObjectURL(recording));
    }
  };

  return (
    <Fragment>
      <UploadAudio recordingHandler={recordingHandler} />
      <RecordAudio recordingHandler={recordingHandler} />
      <Button
        variant="contained"
        startIcon={<GraphicEqIcon />}
        disabled={!file}
        onClick={() => pageHandler('analyse')}
      >
        Check frequency
      </Button>
      <Button
        variant="contained"
        startIcon={<InterpreterModeIcon />}
        disabled={!file}
        onClick={() => pageHandler('speakSpread')}
      >
        Speak spread
      </Button>
    </Fragment>
  );
};

export default RecordAndUpload;
