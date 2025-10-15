import React, { useState } from "react";
import Header from "../components/Header";

const sampleData = [
  { assignee: "Assignee X", team: "Team Alpha", date: "2023-10-26", status: "In Progress" },
  { assignee: "Assignee Y", team: "Team Beta", date: "2023-10-25", status: "In Progress" },
  { assignee: "Assignee Z", team: "Team Gamma", date: "2023-10-24", status: "Completed" },
  { assignee: "Assignee W", team: "Team Delta", date: "2023-10-23", status: "Pending Review" },
  { assignee: "Assignee V", team: "Team Epsilon", date: "2023-10-22", status: "In Progress" },
];

const statusColors = {
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  "Pending Review": "bg-yellow-100 text-yellow-800",
};

const ActivityLogs = () => {
  const [data, setData] = useState(sampleData);
  const [sortConfig, setSortConfig] = useState({ key: "assignee", direction: "asc" });

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  return (
    <div className="">
          <Header />
    <div className="min-h-screen bg-gray-900 text-gray-200">
    
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th
                  className="p-4 text-sm font-semibold cursor-pointer hover:text-white"
                  onClick={() => sortData("assignee")}
                >
                  Name
                </th>
                <th
                  className="p-4 text-sm font-semibold cursor-pointer hover:text-white"
                  onClick={() => sortData("team")}
                >
                  Time
                </th>
                <th
                  className="p-4 text-sm font-semibold cursor-pointer hover:text-white"
                  onClick={() => sortData("date")}
                >
                  Email
                </th>
                <th
                  className="p-4 text-sm font-semibold cursor-pointer hover:text-white"
                  onClick={() => sortData("status")}
                >
                  Keyword
                </th>
                <th
                  className="p-4 text-sm font-semibold cursor-pointer hover:text-white"
                  onClick={() => sortData("status")}
                >
                  Date
                </th>
                <th
                  className="p-4 text-sm font-semibold cursor-pointer hover:text-white"
                  onClick={() => sortData("status")}
                >
                  Searched Table
                </th>
                <th
                  className="p-4 text-sm font-semibold cursor-pointer hover:text-white"
                  onClick={() => sortData("status")}
                >
                  Login Time
                </th>
                <th
                  className="p-4 text-sm font-semibold cursor-pointer hover:text-white"
                  onClick={() => sortData("status")}
                >
                  Status
                </th>
             
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="p-4 font-medium">{row.assignee}</td>
                  <td className="p-4 text-gray-400">{row.team}</td>
                  <td className="p-4 text-gray-400">{row.date}</td>
                  <td className="p-4 font-medium">{row.assignee}</td>
                  <td className="p-4 text-gray-400">{row.team}</td>
                  <td className="p-4 text-gray-400">{row.date}</td>
               
                  <td className="p-4 text-gray-400">{row.team}</td>
                 
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[row.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ActivityLogs;
