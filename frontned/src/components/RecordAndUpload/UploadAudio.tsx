import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Input = styled("input")({
  display: "none",
});

const FileUpload = ({ canNextHandler, fileHandler }: any) => {
  return (
    <Fragment>
      <label htmlFor="contained-button-file">
        <Input
          accept=".wav"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(event: any) => {
            fileHandler(event.target.files[0]);
            canNextHandler();
          }}
        />
        <Button variant="contained" component="span">
          Upload file
        </Button>
      </label>
    </Fragment>
  );
};

export default FileUpload;
