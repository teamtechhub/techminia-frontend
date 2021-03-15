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
import Button from "components/Button/Button";
import { PicInput } from "containers/DarasaForms/df.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from '@fortawesome/fontawesome-free-solid'


function Uploader({ onChange, imageURL, doc, multiple, minimal, preview }) {
  const [files, setFiles] = useState(
    imageURL ? [{ name: "darasa-file", preview: imageURL }] : []
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: doc ? ".doc, .docx, .pdf" : "image/*",
    multiple: multiple,
    maxFiles: multiple ? 4 : 1,

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
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size / 1000} KB
    </li>
  ));

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
  const minimalThumbs = files.map((file) => (
    <div key={file.name}>
      <p>{file.name}</p>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section
      className="uploader"
      style={
        minimal
          ? {
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
            }
          : {}
      }
    >
      {minimal ? (
        <Button
          size="small"
          {...getRootProps()}
          style={{
            background: "transparent",
            color: "#ec7623",
            textTransform: "none",
            margin: 0,
          }}
          title={
            <PicInput>
              <input {...getInputProps()} />
              <FontAwesomeIcon
                icon={faFileImage}
                className="icon"
                style={{
                  height: "100%",
                  width: "50%",
                }}
              />
            </PicInput>
          }
        />
      ) : (
        <Container {...getRootProps()}>
          <input {...getInputProps()} />
          <UploadIcon />
          <Text>
            <TextHighlighted>Drag/Upload</TextHighlighted> your{" "}
            {`${doc ? "document(s)" : "image"}`} here.
          </Text>
        </Container>
      )}
      {preview ? (
        multiple ? (
          <ul>{acceptedFileItems}</ul>
        ) : (
          thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>
        )
      ) : (
        minimalThumbs
      )}
    </section>
  );
}

export default Uploader;
