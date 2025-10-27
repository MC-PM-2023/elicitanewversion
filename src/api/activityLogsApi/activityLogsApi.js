import axiosInstance from "../axiosInstance";


export const activityLogs=async()=>{
    const response=await axiosInstance.get("/api/logs")
    return response.data
}


