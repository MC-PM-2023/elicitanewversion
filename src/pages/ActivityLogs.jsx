// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import useActivityLogs from "../hooks/activityLogs/useActivityLogs";

// const statusColors = {
//   "In Progress": "bg-blue-100 text-blue-800",
//   Completed: "bg-green-100 text-green-800",
//   "Pending Review": "bg-yellow-100 text-yellow-800",
// };

// const ActivityLogs = () => {
//   const { loading, error, logsData, fetchUserActivityLogs } = useActivityLogs();
//   console.log(logsData)

//   const [sortConfig, setSortConfig] = useState({ key: "assignee", direction: "asc" });
//   const [sortedData, setSortedData] = useState([]);

//   useEffect(() => {
//     fetchUserActivityLogs();
//   }, []);

//   useEffect(() => {
//     setSortedData(logsData);
//   }, [logsData]);

//   const sortData = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }

//     const sorted = [...sortedData].sort((a, b) => {
//       if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
//       if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
//       return 0;
//     });

//   console.log("Sorted is:",sorted)
//     setSortConfig({ key, direction });
//     setSortedData(sorted);
//   };

//   if (loading) return <div className="text-center p-6">Loading...</div>;
//   if (error) return <div className="text-red-500 p-6">{error}</div>;
  
//   const tableHeader=["Name","Time","Email","Keyword","Date","Searched Table","Login Time","Status"]

//   return (
//     <div>
//       <Header />
//       <div className="min-h-screen bg-white text-black p-4">
//         <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
//         <div className="overflow-x-auto rounded-lg shadow-lg">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-800 text-gray-400">
//               <tr>
//                 {tableHeader.map((header,index)=>(
//                   <th key={index} className="p-4 text-sm font-semibold" style={{backgroundColor:"#23748C", color:"#dfdfdf"}}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {sortedData.map((row, idx) => (
//                 <tr
//                   key={idx}
//                   className="border-b hover:bg-gray transition-colors"
//                 >
//                   <td className="p-4 text-black">{row.name}</td>
//                   <td className="p-4 text-black">{row.time}</td>
//                   <td className="p-4 text-black">{row.email}</td>
//                   <td className="p-4 text-black">{row.keyword}</td>
//                   <td className="p-4 text-black">{row.date}</td>
//                   <td className="p-4 text-black">{row.tables_searched}</td>
//                   <td className="p-4 text-black">{row.login_time}</td>
//                   <td className="p-4 text-black">{row.status}</td>
//                 </tr>
//               ))}
              
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivityLogs;


import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useActivityLogs from "../hooks/activityLogs/useActivityLogs";





const ActivityLogs = () => {

  const { loading, error, logsData, fetchUserActivityLogs } = useActivityLogs();
  const [sortConfig, setSortConfig] = useState({ key: "assignee", direction: "asc" });
  const [sortedData, setSortedData] = useState([]);


  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

useEffect(() => {
  const storedUser = localStorage.getItem("user"); // key used in localStorage
 console.log(storedUser)
  if (storedUser) {
    try{
      setUserInfo(JSON.parse(storedUser));
    }
    catch(error){
      console.error("Failed to parse localstorage error",error)
    }
   
  }
}, []);


// console.log("User info :",userInfo.name)
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

    setSortConfig({ key, direction });
    setSortedData(sorted);
  };

  const tableHeader = ["Name", "Date", "Time", "Keyword","Searched Column", "Searched Table", "Fetching Time","Login Time", "Status"];

  if (loading) return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  if (error) return <div style={{ color: "red", padding: "20px" }}>{error}</div>;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Activity Logs</h1>

        <div style={{ flex: 1, overflow: "hidden", border: "1px solid #ccc", borderRadius: "8px" }}>
          {/* Only tbody scrolls */}
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#23748C", color: "#dfdfdf", zIndex: 10 }}>
              <tr>
                {tableHeader.map((header, index) => (
                  <th key={index} style={{ padding: "12px", fontWeight: "bold", borderBottom: "1px solid #ccc" , textAlign:"left", fontSize:14}}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          </table>

          {/* Scrollable tbody */}
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <tbody>
                {sortedData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                   <td style={{ padding: "12px" }}>{row.name || userInfo?.firstname}</td>
                   {/* <td style={{ padding: "12px" }}>
  {[
    "Auxcilia mary",
    'Megha M',
    "Brito Raj S",
    "Sathish",
    "K Harish",
    "P Balaji"
  ].filter(Boolean)[Math.floor(Math.random() * 4)]}
</td> */}
                    <td style={{ padding: "12px" }}>{row.date}</td>
                    <td style={{ padding: "12px" }}>{row.time}</td> 
                    <td style={{ padding: "12px" }}>{row.keyword}</td>
                    <td style={{ padding: "12px" }}>{row.columns_searched}</td>
                    <td style={{ padding: "12px" }}>{row.tables_searched}</td>
                    <td style={{ padding: "12px" }}>{row.fetching_time}</td>
                    <td style={{ padding: "12px" }}>{row.login_time}</td>
                    <td style={{ padding: "12px" }}>{row.status}</td>
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
// name varchar(255) 
// time time 
// email varchar(255) 
// keyword varchar(255) 
// date date 
// tables_searched text 
// columns_searched varchar(255) 
// fetching_time decimal(10,2) 
// login_time datetime 
// status varchar(50)


// Log: Change the Table Order like Name, Date, Time, Keyword, Column Searched, Searched Table, Fetcing Time, Status





 {/* <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[row.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td> */}