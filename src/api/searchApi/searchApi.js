import axiosInstance from "../axiosInstance";
export const searchData = async ({ table, column, query }) => {
  const response = await axiosInstance.get('/api/search', {
    params: { table, column, query }
  });
  return response.data;
};
