import axiosInstance from "../axiosInstance"


export const verifyOTPApi=async({email,otp})=>{
const response=await axiosInstance.post('/api/auth/verifyotp',{
    email,
    otp
})
return response
}