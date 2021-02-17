import { axiosInstance, tokenConfig } from "utils/axios";

export function getThread(threadSlug) {
  return axiosInstance.get(`/forums/threads/${threadSlug}/`, tokenConfig());
}

export function getPosts(threadId, nextHref) {
  return axiosInstance.get(
    `/forums/posts/?thread_id=${threadId}${
      nextHref ? "&page=" + nextHref : ""
    }`,
    tokenConfig()
  );
}

export function newPostCall(post) {
  return axiosInstance.post(`/forums/posts/`, post, tokenConfig());
}

export function updatePostCall(post) {
  return axiosInstance.patch(`/forums/posts/${post.uid}/`, post, tokenConfig());
}

export function deletePostCall(post) {
  return axiosInstance.delete(
    `/forums/posts/${post.uid}/`,
    post,
    tokenConfig()
  );
}

export async function votePostCall(post, vote) {
  await axiosInstance.post(
    `/forums/posts/${post.uid}/vote/`,
    { vote },
    tokenConfig()
  );
}
