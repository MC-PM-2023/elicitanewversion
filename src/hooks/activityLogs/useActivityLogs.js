import React, { useState } from 'react'
import { activityLogs } from "../../api/activityLogsApi/activityLogsApi";

const useActivityLogs = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [logsData, setLogsData] = useState([])

    const fetchUserActivityLogs = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await activityLogs()
            setLogsData(response.data)
        }
        catch (error) {
            setError(error?.response?.data?.message || "An error occured")
        }
        finally {
            setLoading(false)
        }

    }
    return { logsData, error, loading, fetchUserActivityLogs }
}

export default useActivityLogs