import axios_client from "../index.js";

const getToken = () => localStorage.getItem("token");

// CREATE POST
export const createPostService = async (formData) => {
  const token = getToken();
  const res = await axios_client.post("/posts/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// GET ALL POSTS
export const getAllPostsService = async () => {
  const token = getToken();
  const res = await axios_client.get("/posts/getall", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// GET MY POSTS
export const getMyPostsService = async () => {
  const token = getToken();
  const res = await axios_client.get("/posts/myposts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// UPDATE POST
export const updatePostService = async (postId, formData) => {
  const token = getToken();
  const res = await axios_client.put(`/posts/${postId}/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// LIKE / UNLIKE
export const likePostService = async (postId) => {
  const token = getToken();
  const res = await axios_client.put(
    `/posts/${postId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const unlikePostService = async (postId) => {
  const token = getToken();
  const res = await axios_client.put(
    `/posts/${postId}/unlike`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// ADD COMMENT
export const addCommentService = async (postId, text) => {
  const token = getToken();
  const res = await axios_client.post(
    `/posts/${postId}/comment`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
