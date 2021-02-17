import { axiosInstance, tokenConfig } from "utils/axios";

export function getTopics(nextRef) {
  return axiosInstance.get(
    `/forums/topics/${nextRef ? "?&page=" + nextRef : ""}`,
    tokenConfig()
  );
}
export function getTopic(slug) {
  return axiosInstance.get(`/forums/topics/${slug}/`, tokenConfig());
}
