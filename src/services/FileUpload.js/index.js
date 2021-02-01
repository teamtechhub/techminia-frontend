import { formTokenConfig, axiosInstance } from "utils/axios";

class FileUploadService {
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

export default new FileUploadService();
