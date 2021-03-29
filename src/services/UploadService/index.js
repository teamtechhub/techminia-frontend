import { axiosInstance, formTokenConfig } from "utils/axios";

const axios = require("axios");
import { logToConsole } from "utils/logging";

class UploadService {
  uploadImage(data) {
    return axios.post("http://localhost:5000/", data, {}).then((res) => {
      //logToConsole(res.data)
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
