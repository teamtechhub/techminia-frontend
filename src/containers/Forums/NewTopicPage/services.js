import { axiosInstance, tokenConfig } from "utils/axios";

export function newTopicCall(topic_data) {
  return axiosInstance.post(`/forums/topics/`, topic_data, tokenConfig());
}
