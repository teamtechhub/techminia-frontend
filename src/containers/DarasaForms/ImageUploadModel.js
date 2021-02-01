import Button from "components/Button/Button";
import TextField from "components/forms/TextField";
import {
  Container,
  Wrapper,
  Heading,
  SubHeading,
} from "containers/Authentication/SignInOutForm.style";
import React from "react";

import uploadService from "services/UploadService";

function ImageUplaodModel(props) {
  const [image, setImage] = React.useState(undefined);
  const [imageWarning, setImageWarning] = React.useState("");

  // const selectImage = (e)=>{
  //   setImage({ image:e.target.files[0]})
  // }

  const uploadImage = () => {
    console.log(props.contextData);
    console.log(image);
    console.log(image.size);

    if (image.size > 3110670) {
      setImageWarning("File Size is too big");
    } else if (0) {
      //only images.
    } else {
      const formData = new FormData();
      formData.append("myfile", image);
      uploadService.uploadImage(formData).then(
        (data) => {
          // console.log(data);
          var imageLink = data.host + "/" + data.image;
          props.handleImagePopClose();
          props.updateImageLink(imageLink, props.contextData);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setImageWarning(resMessage);
        }
      );
    }
  };

  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>Upload Image Here</Heading>

        <SubHeading>
          <TextField
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {imageWarning !== "" ? <p>{imageWarning}</p> : ""}
          <Button color="primary" onClick={uploadImage} title="Upload" />
        </SubHeading>
      </Container>
    </Wrapper>
  );
}

export default ImageUplaodModel;
