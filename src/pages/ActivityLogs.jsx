import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useActivityLogs from "../hooks/activityLogs/useActivityLogs";

const statusColors = {
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  "Pending Review": "bg-yellow-100 text-yellow-800",
};

const ActivityLogs = () => {
  const { loading, error, logsData, fetchUserActivityLogs } = useActivityLogs();
  console.log(logsData)

  const [sortConfig, setSortConfig] = useState({ key: "assignee", direction: "asc" });
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    fetchUserActivityLogs();
  }, []);

  useEffect(() => {
    setSortedData(logsData);
  }, [logsData]);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

  console.log("Sorted is:",sorted)
    setSortConfig({ key, direction });
    setSortedData(sorted);
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;
  
  const tableHeader=["Name","Time","Email","Keyword","Date","Searched Table","Login Time","Status"]

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white text-black p-4">
        <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                {tableHeader.map((header,index)=>(
                  <th key={index} className="p-4 text-sm font-semibold" style={{backgroundColor:"#23748C", color:"#dfdfdf"}}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray transition-colors"
                >
                  <td className="p-4 text-black">{row.name}</td>
                  <td className="p-4 text-black">{row.time}</td>
                  <td className="p-4 text-black">{row.email}</td>
                  <td className="p-4 text-black">{row.keyword}</td>
                  <td className="p-4 text-black">{row.date}</td>
                  <td className="p-4 text-black">{row.tables_searched}</td>
                  <td className="p-4 text-black">{row.login_time}</td>
                  <td className="p-4 text-black">{row.status}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;


 {/* <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[row.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td> */}