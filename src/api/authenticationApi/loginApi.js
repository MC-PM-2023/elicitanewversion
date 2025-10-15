import axiosInstance from "../axiosInstance";

export const loginApi = async ({ email, password }) => {
  const response = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  return response;
};
