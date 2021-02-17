import { axiosInstance, tokenConfig } from "utils/axios";

export function getThreads(topicSlug, nextHref) {
  return axiosInstance.get(
    `/forums/threads/?topic__slug=${topicSlug}${
      nextHref ? "&page=" + nextHref : ""
    }`,
    tokenConfig()
  );
}
