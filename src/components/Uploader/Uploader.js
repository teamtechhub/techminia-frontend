import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Text,
  TextHighlighted,
  Container,
  ThumbsContainer,
  Thumb,
  ThumbInner,
  Img,
} from "./Uploader.style";
import { UploadIcon } from "../AllSvgIcon";

function Uploader({ onChange, imageURL }) {
  const [files, setFiles] = useState(
    imageURL ? [{ name: "demo", preview: imageURL }] : []
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: useCallback(
      (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        onChange(acceptedFiles);
      },
      [onChange]
    ),
  });

  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <Img
          src={typeof file === "string" ? file : file.preview}
          alt={file.name}
        />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="uploader">
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadIcon />
        <Text>
          <TextHighlighted>Drag/Upload</TextHighlighted> your image here.
        </Text>
      </Container>
      {thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>}
    </section>
  );
}

export default Uploader;
