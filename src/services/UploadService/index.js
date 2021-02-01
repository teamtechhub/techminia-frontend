import { axiosInstance, formTokenConfig } from "utils/axios";

const axios = require("axios");

class UploadService {
  uploadImage(data) {
    return axios.post("http://localhost:5000/", data, {}).then((res) => {
      //console.log(res.data)
      return res.data;
    });
  }

  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    return axiosInstance.post(
      "/form",
      formData,
      formTokenConfig,
      onUploadProgress
    );
  }

  getFiles() {
    return axiosInstance.get("/form");
  }
}

export default new UploadService();
