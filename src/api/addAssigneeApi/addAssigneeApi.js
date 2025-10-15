import axiosInstance from "../axiosInstance";

export const addAssignee=async(data)=>{
    const {assigneename,productcategory,assigneeurl}=data
    const response=await axiosInstance.post("/api/admin/addassignee",{
        assigneename,
        productcategory,
        assigneeurl
    })
    return response.data;
}
