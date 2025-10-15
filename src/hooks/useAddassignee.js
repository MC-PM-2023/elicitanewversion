import { useState } from "react";
import { addAssignee } from "../api/addAssigneeApi/addAssigneeApi";

export const useAddAssignee = () => {
  const [datas, setDatas] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveAddassignee = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const saveResponse = await addAssignee(data);
      setDatas(saveResponse.data);
      setSuccess(saveResponse.data.message || "Assignee added successfully!"); 
      console.log(saveResponse.data);
    } catch (err) {
      console.error("Saving assignee details error", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while saving assignee details"
      );
    } finally {
      setLoading(false);
    }
  };

  return { datas, error, success, loading, saveAddassignee };
};
