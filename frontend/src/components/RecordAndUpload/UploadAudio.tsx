import { Fragment } from 'react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const Input = styled('input')({
  display: 'none',
});

interface FileUploadProps {
  recordingHandler: (recording: File | string) => void;
}

const FileUpload = ({ recordingHandler }: FileUploadProps) => {
  return (
    <Fragment>
      <label htmlFor="contained-button-file">
        <Input
          accept=".wav"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(event) => {
            if (!event.target.files) return;
            recordingHandler(event.target.files[0]);
          }}
        />
        <Button
          variant="contained"
          startIcon={<DriveFolderUploadIcon />}
          component="span"
        >
          Upload file
        </Button>
      </label>
    </Fragment>
  );
};

export default FileUpload;
