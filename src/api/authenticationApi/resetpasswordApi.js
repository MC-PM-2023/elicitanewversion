// src/api/resetpasswordApi.js
import axiosInstance from "../axiosInstance";

export const resetpasswordApi = async (payload) => {
  const response = await axiosInstance.post("/api/auth/resetpassword", payload);
  return response.data;
};
