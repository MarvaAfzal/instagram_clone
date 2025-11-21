import axios_client from "../index.js";

// ===== LOGIN =====
export const loginUserService = async (data) => {
  // data = { email: "example@email.com", password: "123456" }
  const res = await axios_client.post("/auth/login", data);
  return res.data;
};

// ===== SIGNUP =====
export const signupUserService = async (data) => {
  // data = { name: "Marva", email: "example@email.com", password: "123456" }
  const res = await axios_client.post("/auth/signup", data);
  return res.data;
};
