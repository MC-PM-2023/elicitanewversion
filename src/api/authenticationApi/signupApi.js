import axiosInstance from "../axiosInstance";

export const signupApi=async(data)=>{
const {firstname,lastname,email,password,confirmpassword}=data;
const response=await axiosInstance.post('/api/auth/signup',{
firstname,
lastname,
email,
password,
confirmpassword
})
return response;
}