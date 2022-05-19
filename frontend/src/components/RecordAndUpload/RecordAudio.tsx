import { useEffect, Fragment } from 'react';

import Button from '@mui/material/Button';

import MicIcon from '@mui/icons-material/Mic';

import styled from 'styled-components';

import { useReactMediaRecorder } from 'react-media-recorder';

const Wave = styled.div`
  @keyframes sonarWave {
    from {
      transform: scale(0.5);
      opacity: 0.2;
    }
    to {
      transform: scale(1);
      opacity: 0;
    }
  }

  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  background-color: white;
  animation: sonarWave 1s ease infinite;
  z-index: -1;
`;

interface RecordProps {
  recordingHandler: (data: File | string) => void;
}

const Record = ({ recordingHandler }: RecordProps) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({});

  useEffect(() => {
    if (mediaBlobUrl) recordingHandler(mediaBlobUrl);
  }, [mediaBlobUrl, recordingHandler]);

  const recordingWorker = () => {
    if (status === 'recording') {
      stopRecording();
    } else if (status === 'idle' || status === 'stopped') {
      startRecording();
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        startIcon={<MicIcon />}
        onClick={recordingWorker}
        color={status === 'recording' ? 'error' : 'primary'}
      >
        {status === 'recording' ? 'Stop' : 'Start'} recording
      </Button>
      {status === 'recording' ? <Wave /> : ''}
    </Fragment>
  );
};

export default Record;
