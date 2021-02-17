import { axiosInstance, tokenConfig } from "utils/axios";

export function newThreadCall(data) {
  return axiosInstance.post(`/forums/threads/`, data, tokenConfig());
}
