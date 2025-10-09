import axiosInstance from "../axiosInstance";

export const fetchAllColumns = async () => {
  const response = await axiosInstance.get('/api/all-columns');
  return response.data;
};
