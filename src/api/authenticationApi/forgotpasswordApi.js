import axiosInstance from "../axiosInstance";


export const forgotpasswordApi=async(email)=>{
const response=await axiosInstance.post("/api/auth/forgotpassword",email)
return response.data
}