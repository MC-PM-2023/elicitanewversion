// //last code
// import React, { useState, useMemo, useEffect, useCallback } from "react";
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";

// const cardVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1 },
//   }),
// };

// // ✅ Card layout tables
// const CARD_COLUMNS = {
//   Reference_Table: [
//     "Project_Code",
//     "Docket",
//     "Project_Title",
//     "Reference_No",
//     "Rating_of_Reference",
//     "Observation",
//     "Relevant_Excerpts",
//   ],
//   Report_Data: [
//     "Project_Code",
//     "Docket",
//     "Project_Title",
//     "Understanding",
//     "Key_Feature",
//     "Overall_Rating",
//   ],
// };

// // ✅ Strict order for table layout
// const ORDER_FOR_TABLES = {
//   Strings: ["Project_Code", "Docket", "Strings", "Strings_Hits"],
//   IPC_CPC_Code: [
//     "Project_Code",
//     "Product_Category",
//     "IPC_CPC",
//     "Definition",
//     "Type",
//   ],
//   IPC: ["Project_Code", "Product_Category", "IPC_CPC", "Definition", "Type"],
//   Assignee_Table: ["Assignee_Name", "Product_Category", "Assignee_URL"],
// };




// export default function ResultsTable({
//   results,
//   selectedColumn,
//   selectedTable,
//   searchTerm,
//   filterTerm,
//   exactMatch
 
// }) {
//   const [showViewDetails, setShowViewDetails] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [activeColumn, setActiveColumn] = useState(null);
//   const [columnSearch, setColumnSearch] = useState("");
//   const [showProjectCard, setShowProjectCard] = useState(false);
//   const [projectCodesForModal, setProjectCodesForModal] = useState([]);
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

//   const MAX_RESULTS = 50;

//   // ✅ Sort results by Project_Code/Docket
//   const limitedResults = useMemo(() => {
//     if (!results) return [];
//     return [...results].sort((a, b) => {
//       const getNumber = (code) => {
//         if (!code) return 0;
//         const match = code.match(/-(\d+)$/);
//         return match ? parseInt(match[1], 10) : 0;
//       };
//       const numA = getNumber(a.Project_Code || a.Docket);
//       const numB = getNumber(b.Project_Code || b.Docket);
//       return numB - numA;
//     });
//   }, [results]);

//   // ✅ Unique Project Codes for the Card
//   const uniqueProjectCodes = useMemo(() => {
//     // if (!results || selectedTable !== "IPC_CPC_Code") return [];
//     if (
//       !results ||
//       !["IPC_CPC_Code", "Reference_Table", "Report_Data"].includes(selectedTable)
//     )
//       return [];
    
//     const codes = results.map((r) => r.Project_Code).filter(Boolean);
//     return [...new Set(codes)];
//   }, [results, selectedTable]);
  

  
// const handleBadgeClick = (e,codes) => {
//   const rect = e.target.getBoundingClientRect();

//   setModalPosition({
//     x: rect.left + rect.width / 2,      // center horizontally at click
//     y: rect.top + window.scrollY + rect.height +10, // add scroll offset
//   });

//   setShowProjectCard(true);
//   setProjectCodesForModal(codes);

// };

// const filteredResults = useMemo(() => {
//   let data = results || []; // ✅ Use full dataset, not limited results

//   // ✅ Filter by selected project
//   if (
//     selectedProject &&
//     ["IPC_CPC_Code", "Reference_Table", "Report_Data"].includes(selectedTable)
//   ) {
//     data = data.filter((r) => {
//       const codes = r.Project_Code
//         ? r.Project_Code.split(/\s*\|\|\s*|\s*\|\s*/).map((c) => c.trim()).filter(Boolean)
//         : [];
//       return codes.includes(selectedProject);
//     });
//   }

//   // ✅ Column-level search filter (handles exact match)
//   if (activeColumn && columnSearch) {
//     const search = columnSearch.trim().toLowerCase();
//     data = data.filter((row) => {
//       const value = row[activeColumn];
//       if (!value) return false;
//       const text = value.toString().trim().toLowerCase();
//       return exactMatch ? text === search : text.includes(search);
//     });
//   }

//   // ✅ Global keyword filter
//   if (filterTerm.trim() !== "") {
//     const lowerFilter = filterTerm.toLowerCase();
//     data = data.filter((row) =>
//       Object.values(row).some(
//         (val) => val && val.toString().toLowerCase().includes(lowerFilter)
//       )
//     );
//   }

//   // ✅ Apply limit AFTER filtering
//   // return data.slice(0, 50);
//   return data.slice(0,2000);
// }, [
//   results,
//   activeColumn,
//   columnSearch,
//   selectedProject,
//   selectedTable,
//   filterTerm,
//   exactMatch,
// ]);

//   useEffect(() => {
//     setShowViewDetails(true);
//   }, [selectedColumn]);

//   // ✅ Define columns to show
//   const columnsToShow = useMemo(() => {
//     let cols =
//       CARD_COLUMNS[selectedTable] ||
//       ORDER_FOR_TABLES[selectedTable] ||
//       Object.keys(results?.[0] || {});
//     // if (selectedTable === "IPC_CPC_Code") {
//     //   cols = cols.filter((col) => col !== "Project_Code");
//     // }
//     return cols;
//   }, [selectedTable, results]);

//   const toggleViewDetails = useCallback(() => {
//     setShowViewDetails((prev) => !prev);
//   }, []);

//   const highlightMatch = (text, keyword) => {
//     if (!keyword?.trim()) return text;
//     const regex = new RegExp(`(${keyword})`, "gi");
//     const parts = text.split(regex);
//     return parts.map((part, index) =>
//       regex.test(part) ? (
//         <mark
//           key={index}
//           className="text-black font-semibold"
//           style={{ backgroundColor: "#FF771C", color: "#dfdfdf" }}
//         >
//           {part}
//         </mark>
//       ) : (
//         part
//       )
//     );
//   };


//   // Function to highlight matching filter terms
// const highlightMatchfilterTerm = (text) => {
//   if (!filterTerm.trim() || typeof text !== "string") return text;

//   const regex = new RegExp(`(${filterTerm})`, "gi");
//   return text.split(regex).map((part, index) =>
//     part.toLowerCase() === filterTerm.toLowerCase() ? (
//       <span key={index} className="bg-yellow-300 font-bold">
//         {part}
//       </span>
//     ) : (
//       part
//     )
//   );
// };


//   // ✅ Render Results
//   const renderedResults = useMemo(() => {
//     if (!results || results.length === 0) {
//       return (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center text-gray-500 text-xs mt-10"
//         >
//           Search results will appear here.
//         </motion.p>
//       );
//     }
  
//     // ✅ Card Layout only for Reference_Table & Report_Data
//     if (["Reference_Table", "Report_Data"].includes(selectedTable) && selectedColumn) {
//       return (
//         <motion.div className="space-y-3" initial="hidden" animate="visible" variants={cardVariants}>
//           {/* <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
//             Results
//             <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-indigo-700 rounded-full">
//               {filteredResults.length || 0}
//             </span>
//           </span> */}
  
//           {filteredResults.map((item, idx) => (
//             <motion.div
//               key={idx}
//               custom={idx}
//               variants={cardVariants}
//               className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow"
//             >
//               {columnsToShow.map((key) => {
//                 if (key.toLowerCase() === "id") return null;
  
//                 const value = item[key];
//                 const stringValue = value !== null && value !== "" ? value.toString() : "—";
  
//                 // ✅ Make Reference_No clickable if Reference_Link exists
//                 if (key === "Reference_No" && item.Reference_Link) {
//                   return (
//                     <div key={key} className="mb-3">
//                       <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
//                         {key.replace(/_/g, " ")}
//                       </p>
//                       <a
//                         href={item.Reference_Link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:underline text-sm font-semibold"
//                       >
//                         {stringValue}
//                       </a>
//                     </div>
//                   );
//                 }
  
//                 const displayValue =stringValue
               
//                   // !showViewDetails && stringValue.length > 500
//                   //   ? `${stringValue.slice(0, 2000)}...`
//                   //   : stringValue;
  
//                 return (
//                   <div key={key} className="mb-3">
//                     <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
//                       {key.replace(/_/g, " ")}
//                     </p>
//                     <p
//                       className="text-sm font-semibold text-gray-800 text-justify"
//                       title={stringValue}
//                     >
//                       {highlightMatch(displayValue, searchTerm)}
//                     </p>
//                   </div>
//                 );
//               })}
  
//               <div className="mt-4 text-right flex justify-end gap-2">
//                 <button
//                   className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
//                   onClick={toggleViewDetails}
//                 >
//                   {showViewDetails ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       );
//     }
  
//     // ✅ Otherwise show normal table layout (for all other tables including IPC_CPC_Code)
//     return (
//       <div>
      
  
//         {/* Table */}
//         <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md mt-4 relative">
//           <table className="min-w-full text-sm text-gray-700">
        
//             <thead
//   className="bg-gray-100 text-gray-600 uppercase text-xs"
//   style={{ backgroundColor: "#23748C", color: "#dfdfdf" }}
// >
//   <tr>
//     {columnsToShow
//       .filter((col) => col.toLowerCase() !== "id")
//       .map((header) => (
//         <th
//           key={header}
//           className="px-4 py-2 text-center font-semibold"
//         >
//           {header.replace(/_/g, " ")}
//         </th>
//       ))}
//   </tr>
// </thead>

  
//             <tbody>
//               {filteredResults.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   className={`border-b hover:bg-gray-50 ${
//                     selectedTable === "IPC_CPC_Code" &&
//                     selectedProject === row.Project_Code
//                       ? "bg-indigo-50"
//                       : ""
//                   }`}
//                 >
//                  {columnsToShow.map((col, colIndex) => {
//   const value = row[col];
//   const displayValue =
//     value !== null && value !== "" ? value.toString() : "—";


// if (selectedTable === "IPC_CPC_Code" && col === "Project_Code") {
//   if (!value) {
//     return (
//       <td key={colIndex} className="px-4 py-2 text-xs text-center text-gray-400">
//         —
//       </td>
//     );
//   }

//   // ✅ Make sure value is always a string
//   const stringValue = typeof value === "string" ? value : String(value);

//   // ✅ Split correctly — handle "|" or "||" separators
//   const codes = stringValue
//     .split(/\s*\|\|\s*|\s*\|\s*/)
//     .map((code) => code.trim())
//     .filter(Boolean);

//   console.log("Row Project Codes:", codes); // ✅ Debug output

//   return (
//     <td key={colIndex} className="px-4 py-2 text-xs text-start align-top" >
//       <div className="flex flex-wrap gap-2">
//       {codes.length > 0 ? (
//         codes.map((code, idx) => (
//           <span
//             key={idx}
//             // className="text-blue-600 font-semibold cursor-pointer hover:underline mr-2"
//              className="
//                 inline-flex items-center 
//                 bg-indigo-100 text-indigo-800 font-semibold 
//                 text-[11px] px-2 py-1 rounded-full 
//                 cursor-pointer hover:bg-indigo-200 
//                 transition-colors
//               "
            
//             onClick={(e) => {
//             handleBadgeClick(e,codes)
//             }}
//           >
//             {code}
//           </span>
//         ))
//       ) : (
//         <span className="text-gray-400">—</span>
//       )}
//       </div>
//     </td>
//   );
// }







// // escape helper for regex
// const escapeRegExp = (s) =>
//   s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// // Combined highlighter: highlights filterTerm (yellow) and searchTerm (orange mark)
// const highlightBoth = (text, searchTerm, filterTerm) => {
//   if (text == null) return "—";
//   const original = String(text);

//   // If no filterTerm and only searchTerm -> reuse existing behavior
//   if ((!filterTerm || !filterTerm.trim()) && (!searchTerm || !searchTerm.trim())) {
//     return original;
//   }

//   const escapedFilter = filterTerm ? escapeRegExp(filterTerm.trim()) : null;
//   const escapedSearch = searchTerm ? escapeRegExp(searchTerm.trim()) : null;

//   // Build regex for filterTerm (global, case-insensitive)
//   const filterRegex = escapedFilter ? new RegExp(`(${escapedFilter})`, "gi") : null;
//   const searchRegex = escapedSearch ? new RegExp(`(${escapedSearch})`, "gi") : null;

//   // If there's a filterRegex, split on it so we can wrap matching chunks with yellow
//   if (filterRegex) {
//     const parts = original.split(filterRegex); // includes matches
//     return parts.map((part, i) => {
//       if (filterRegex.test(part)) {
//         // filterTerm matched -> yellow highlight (preserve case)
//         return (
//           <span key={i} className="bg-yellow-300 font-bold px-0.5 rounded">
//             {part}
//           </span>
//         );
//       } else {
//         // no filterTerm match in this part — but still highlight searchTerm if present
//         if (searchRegex) {
//           const innerParts = part.split(searchRegex);
//           return innerParts.map((p, j) =>
//             searchRegex.test(p) ? (
//               <mark
//                 key={`${i}-${j}`}
//                 className="text-black font-semibold"
//                 style={{ backgroundColor: "#FF771C", color: "#dfdfdf" }}
//               >
//                 {p}
//               </mark>
//             ) : (
//               <span key={`${i}-${j}`}>{p}</span>
//             )
//           );
//         }
//         // neither filter nor search -> plain text
//         return <span key={i}>{part}</span>;
//       }
//     });
//   }

//   // No filterTerm, only searchTerm exists => highlight searchTerm using your previous mark
//   if (searchRegex) {
//     const parts = original.split(searchRegex);
//     return parts.map((part, i) =>
//       searchRegex.test(part) ? (
//         <mark
//           key={i}
//           className="text-black font-semibold"
//           style={{ backgroundColor: "#FF771C", color: "#dfdfdf" }}
//         >
//           {part}
//         </mark>
//       ) : (
//         <span key={i}>{part}</span>
//       )
//     );
//   }

//   // fallback
//   return original;
// };



//   return (
//     // <td
//     //   key={colIndex}
//     //   className="px-4 py-2 text-gray-800 text-xs break-words text-start"
//     // >
//     //   {highlightMatch(displayValue, searchTerm)}
//     // </td>
//     <td
//   key={colIndex}
//   className="px-4 py-2 text-gray-800 text-xs break-words text-start"
// >
// {highlightBoth(displayValue, searchTerm, filterTerm)}

// </td>

//   );
// })}

//                 </tr>
//               ))}
//             </tbody>
//           </table>


// {showProjectCard && selectedTable === "IPC_CPC_Code" && (
//   <div
//     className="fixed inset-0 z-50"
//     onClick={() => setShowProjectCard(false)}
//   >
//     {/* Dimmed background */}
//     <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />

//     {/* Modal box — positioned at click point */}
//     <div
//       className="absolute bg-white p-4 rounded-2xl shadow-2xl w-80 max-h-[70vh] overflow-y-auto transition-all duration-200"
//       style={{
//         top: `${modalPosition.y}px`,
//         left: `${modalPosition.x}px`,
//         transform: "translate(-50%, 0)", // center horizontally near the click
//       }}
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Close button */}
//       <button
//         className="absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl"
//         onClick={() => setShowProjectCard(false)}
//       >
//         ×
//       </button>

//       <h3 className="text-md font-semibold mb-3 text-indigo-700 text-center">
//         Select Project Code
//       </h3>

//       <div className="flex flex-wrap gap-2 justify-center">
//         {projectCodesForModal.length > 0 ? (
//           projectCodesForModal.map((code, index) => (
//             <span
//               key={index}
//               onClick={() => {
//                 setSelectedProject(code);
//                 setShowProjectCard(false);
//               }}
//               className="inline-flex items-center justify-center bg-indigo-100 
//                          text-indigo-800 font-semibold text-xs px-3 py-1 rounded-full 
//                          cursor-pointer hover:bg-indigo-200 transition-colors"
//             >
//               {code}
//             </span>
//           ))
//         ) : (
//           <p className="text-sm text-gray-500 text-center w-full">
//             No project codes available
//           </p>
//         )}
//       </div>
//     </div>
//   </div>
// )}





//         </div>
//       </div>
//     );
//   }, [
//     filteredResults,
//     selectedColumn,
//     selectedTable,
//     activeColumn,
//     columnSearch,
//     selectedProject,
//     showProjectCard,
//     showViewDetails,
//   ]);
  

  

//   return renderedResults;
// }




import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

// ✅ Card layout tables
const CARD_COLUMNS = {
  Reference_Table: [
    "Project_Code",
    "Docket",
    "Project_Title",
    "Reference_No",
    "Rating_of_Reference",
    "Observation",
    "Relevant_Excerpts",
  ],
  Report_Data: [
    "Project_Code",
    "Docket",
    "Project_Title",
    "Understanding",
    "Key_Feature",
    "Overall_Rating",
  ],
};

// ✅ Strict order for table layout
const ORDER_FOR_TABLES = {
  Strings: ["Project_Code", "Docket", "Strings", "Strings_Hits"],
  IPC_CPC_Code: [
    "Project_Code",
    "Product_Category",
    "IPC_CPC",
    "Definition",
    "Type",
  ],
  IPC: ["Project_Code", "Product_Category", "IPC_CPC", "Definition", "Type"],
  Assignee_Table: ["Assignee_Name", "Product_Category", "Assignee_URL"],
};




export default function ResultsTable({
  results,
  selectedColumn,
  selectedTable,
  searchTerm,
  filterTerm,
  exactMatch
 
}) {
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const [columnSearch, setColumnSearch] = useState("");
  const [showProjectCard, setShowProjectCard] = useState(false);
  const [projectCodesForModal, setProjectCodesForModal] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  

  const MAX_RESULTS = 50;

  // ✅ Sort results by Project_Code/Docket
  const limitedResults = useMemo(() => {
    if (!results) return [];
    return [...results].sort((a, b) => {
      const getNumber = (code) => {
        if (!code) return 0;
        const match = code.match(/-(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      };
      const numA = getNumber(a.Project_Code || a.Docket);
      const numB = getNumber(b.Project_Code || b.Docket);
      return numB - numA;
    });
  }, [results]);

  // ✅ Unique Project Codes for the Card
  const uniqueProjectCodes = useMemo(() => {
    // if (!results || selectedTable !== "IPC_CPC_Code") return [];
    if (
      !results ||
      !["IPC_CPC_Code", "Reference_Table", "Report_Data"].includes(selectedTable)
    )
      return [];
    
    const codes = results.map((r) => r.Project_Code).filter(Boolean);
    return [...new Set(codes)];
  }, [results, selectedTable]);
  

  
const handleBadgeClick = (e,codes) => {
  const rect = e.target.getBoundingClientRect();

  setModalPosition({
    x: rect.left + rect.width / 2,      // center horizontally at click
    y: rect.top + window.scrollY + rect.height +10, // add scroll offset
  });

  setShowProjectCard(true);
  setProjectCodesForModal(codes);

};

const filteredResults = useMemo(() => {
  // let data = results || []; // ✅ Use full dataset, not limited results
   let data = limitedResults || []; // ✅ Use full dataset, not limited results

  // ✅ Filter by selected project
  if (
    selectedProject &&
    ["IPC_CPC_Code", "Reference_Table", "Report_Data"].includes(selectedTable)
  ) {
    data = data.filter((r) => {
      const codes = r.Project_Code
        ? r.Project_Code.split(/\s*\|\|\s*|\s*\|\s*/).map((c) => c.trim()).filter(Boolean)
        : [];
      return codes.includes(selectedProject);
    });
  }

  // ✅ Column-level search filter (handles exact match)
  if (activeColumn && columnSearch) {
    const search = columnSearch.trim().toLowerCase();
    data = data.filter((row) => {
      const value = row[activeColumn];
      if (!value) return false;
      const text = value.toString().trim().toLowerCase();
      return exactMatch ? text === search : text.includes(search);
    });
  }

  // ✅ Global keyword filter
  if (filterTerm.trim() !== "") {
    const lowerFilter = filterTerm.toLowerCase();
    data = data.filter((row) =>
      Object.values(row).some(
        (val) => val && val.toString().toLowerCase().includes(lowerFilter)
      )
    );
  }

  // ✅ Apply limit AFTER filtering
  // return data.slice(0, 50);
  return data.slice(0,5000);
}, [
  results,
  limitedResults,
  activeColumn,
  columnSearch,
  selectedProject,
  selectedTable,
  filterTerm,
  exactMatch,
]);

  useEffect(() => {
    // When selectedColumn changes, we want to reset the view to collapsed (false)
    // I am changing this to 'false' so the default view is collapsed/truncated.
    // setShowViewDetails(true); // Original code
     setShowViewDetails(false); 
  }, [selectedColumn]);

  // ✅ Define columns to show
  const columnsToShow = useMemo(() => {
    let cols =
      CARD_COLUMNS[selectedTable] ||
      ORDER_FOR_TABLES[selectedTable] ||
      Object.keys(results?.[0] || {});
    // if (selectedTable === "IPC_CPC_Code") {
    //   cols = cols.filter((col) => col !== "Project_Code");
    // }
    return cols;
  }, [selectedTable, results]);

  const toggleViewDetails = useCallback(() => {
    setShowViewDetails((prev) => !prev);
  }, []);
//   const toggleViewDetails = useCallback((idx) => {
//   setExpandedCards((prev) => ({
//     ...prev,
//     [idx]: !prev[idx],
//   }));
// }, []);


  const highlightMatch = (text, keyword) => {
    if (!keyword?.trim()) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="text-black font-semibold"
          style={{ backgroundColor: "#FF771C", color: "#dfdfdf" }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };


  // Function to highlight matching filter terms
const highlightMatchfilterTerm = (text) => {
  if (!filterTerm.trim() || typeof text !== "string") return text;

  const regex = new RegExp(`(${filterTerm})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === filterTerm.toLowerCase() ? (
      <span key={index} className="bg-yellow-300 font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
};


  // ✅ Render Results
  const renderedResults = useMemo(() => {
    if (!results || results.length === 0) {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-xs mt-10"
        >
          Search results will appear here.
        </motion.p>
      );
    }
  
    // ✅ Card Layout only for Reference_Table & Report_Data
    if (["Reference_Table", "Report_Data"].includes(selectedTable) && selectedColumn) {
      return (
        <motion.div className="space-y-3" initial="hidden" animate="visible" variants={cardVariants}>
          {/* <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
            Results
            <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-indigo-700 rounded-full">
              {filteredResults.length || 0}
            </span>
          </span> */}
  
          {filteredResults.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {columnsToShow.map((key) => {
                if (key.toLowerCase() === "id") return null;
  
                const value = item[key];
                const stringValue = value !== null && value !== "" ? value.toString() : "—";
  
                // ✅ Make Reference_No clickable if Reference_Link exists
                if (key === "Reference_No" && item.Reference_Link) {
                  return (
                    <div key={key} className="mb-3">
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                        {key.replace(/_/g, " ")}
                      </p>
                      <a
                        href={item.Reference_Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm font-semibold"
                      >
                        {stringValue}
                      </a>
                    </div>
                  );
                }
  
                // ➡️ IMPLEMENTED SHOW/HIDE LOGIC HERE
                const displayValue =
                  // Apply truncation logic only if view is hidden (false) AND string is long
                  !showViewDetails && stringValue.length > 500
                    ? `${stringValue.slice(0, 500)}...` // Truncate
                    : stringValue; // Full string
  
//                 const isExpanded = expandedCards[idx];

// const displayValue =
//   !isExpanded && stringValue.length > 500
//     ? stringValue.slice(0, 500) + "..."
//     : stringValue;

                return (
                  <div key={key} className="mb-3">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p
                      className="text-sm font-semibold text-gray-800 text-justify"
                      title={stringValue}
                    >
                      {highlightMatch(displayValue, searchTerm)}
                    </p>
                  </div>
                );
              })}
  
              <div className="mt-4 text-right flex justify-end gap-2">
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
                  onClick={()=>toggleViewDetails(idx)}
                >
                  {/* Shows EyeOff (hide details) if showViewDetails is true (details are shown) */}
                  {/* Shows Eye (show details) if showViewDetails is false (details are hidden/truncated) */}
                  {showViewDetails ? <EyeOff /> : <Eye />}
                    {/* {expandedCards[idx] ? <EyeOff /> : <Eye />} */}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }
  
    // ✅ Otherwise show normal table layout (for all other tables including IPC_CPC_Code)
    return (
      <div>
      
  
        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md mt-4 relative">
          <table className="min-w-full text-sm text-gray-700">
        
            <thead
  className="bg-gray-100 text-gray-600 uppercase text-xs"
  style={{ backgroundColor: "#23748C", color: "#dfdfdf" }}
>
  <tr>
    {columnsToShow
      .filter((col) => col.toLowerCase() !== "id")
      .map((header) => (
        <th
          key={header}
          className="px-4 py-2 text-center font-semibold"
        >
          {header.replace(/_/g, " ")}
        </th>
      ))}
  </tr>
</thead>

  
            <tbody>
              {filteredResults.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b hover:bg-gray-50 ${
                    selectedTable === "IPC_CPC_Code" &&
                    selectedProject === row.Project_Code
                      ? "bg-indigo-50"
                      : ""
                  }`}
                >
                 {columnsToShow.map((col, colIndex) => {
  const value = row[col];
  const displayValue =
    value !== null && value !== "" ? value.toString() : "—";


if (selectedTable === "IPC_CPC_Code" && col === "Project_Code") {
  if (!value) {
    return (
      <td key={colIndex} className="px-4 py-2 text-xs text-center text-gray-400">
        —
      </td>
    );
  }

  // ✅ Make sure value is always a string
  const stringValue = typeof value === "string" ? value : String(value);

  // ✅ Split correctly — handle "|" or "||" separators
  const codes = stringValue
    .split(/\s*\|\|\s*|\s*\|\s*/)
    .map((code) => code.trim())
    .filter(Boolean);

  // console.log("Row Project Codes:", codes); // ✅ Debug output (removed console.log for clean code)

  return (
    <td key={colIndex} className="px-4 py-2 text-xs text-start align-top" >
      <div className="flex flex-wrap gap-2">
      {codes.length > 0 ? (
        codes.map((code, idx) => (
          <span
            key={idx}
            // className="text-blue-600 font-semibold cursor-pointer hover:underline mr-2"
             className="
                inline-flex items-center 
                bg-indigo-100 text-indigo-800 font-semibold 
                text-[11px] px-2 py-1 rounded-full 
                cursor-pointer hover:bg-indigo-200 
                transition-colors
              "
            
            onClick={(e) => {
            handleBadgeClick(e,codes)
            }}
          >
            {code}
          </span>
        ))
      ) : (
        <span className="text-gray-400">—</span>
      )}
      </div>
    </td>
  );
}







// escape helper for regex
const escapeRegExp = (s) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Combined highlighter: highlights filterTerm (yellow) and searchTerm (orange mark)
const highlightBoth = (text, searchTerm, filterTerm) => {
  if (text == null) return "—";
  const original = String(text);

  // If no filterTerm and only searchTerm -> reuse existing behavior
  if ((!filterTerm || !filterTerm.trim()) && (!searchTerm || !searchTerm.trim())) {
    return original;
  }

  const escapedFilter = filterTerm ? escapeRegExp(filterTerm.trim()) : null;
  const escapedSearch = searchTerm ? escapeRegExp(searchTerm.trim()) : null;

  // Build regex for filterTerm (global, case-insensitive)
  const filterRegex = escapedFilter ? new RegExp(`(${escapedFilter})`, "gi") : null;
  const searchRegex = escapedSearch ? new RegExp(`(${escapedSearch})`, "gi") : null;

  // If there's a filterRegex, split on it so we can wrap matching chunks with yellow
  if (filterRegex) {
    const parts = original.split(filterRegex); // includes matches
    return parts.map((part, i) => {
      if (filterRegex.test(part)) {
        // filterTerm matched -> yellow highlight (preserve case)
        return (
          <span key={i} className="bg-yellow-300 font-bold px-0.5 rounded">
            {part}
          </span>
        );
      } else {
        // no filterTerm match in this part — but still highlight searchTerm if present
        if (searchRegex) {
          const innerParts = part.split(searchRegex);
          return innerParts.map((p, j) =>
            searchRegex.test(p) ? (
              <mark
                key={`${i}-${j}`}
                className="text-black font-semibold"
                style={{ backgroundColor: "#FF771C", color: "#dfdfdf" }}
              >
                {p}
              </mark>
            ) : (
              <span key={`${i}-${j}`}>{p}</span>
            )
          );
        }
        // neither filter nor search -> plain text
        return <span key={i}>{part}</span>;
      }
    });
  }

  // No filterTerm, only searchTerm exists => highlight searchTerm using your previous mark
  if (searchRegex) {
    const parts = original.split(searchRegex);
    return parts.map((part, i) =>
      searchRegex.test(part) ? (
        <mark
          key={i}
          className="text-black font-semibold"
          style={{ backgroundColor: "#FF771C", color: "#dfdfdf" }}
        >
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  // fallback
  return original;
};



  return (
    <td
  key={colIndex}
  className="px-4 py-2 text-gray-800 text-xs break-words text-start"
>
{highlightBoth(displayValue, searchTerm, filterTerm)}

</td>

  );
})}

                </tr>
              ))}
            </tbody>
          </table>


{showProjectCard && selectedTable === "IPC_CPC_Code" && (
  <div
    className="fixed inset-0 z-50"
    onClick={() => setShowProjectCard(false)}
  >
    {/* Dimmed background */}
    <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />

    {/* Modal box — positioned at click point */}
    <div
      className="absolute bg-white p-4 rounded-2xl shadow-2xl w-80 max-h-[70vh] overflow-y-auto transition-all duration-200"
      style={{
        top: `${modalPosition.y}px`,
        left: `${modalPosition.x}px`,
        transform: "translate(-50%, 0)", // center horizontally near the click
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        className="absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl"
        onClick={() => setShowProjectCard(false)}
      >
        ×
      </button>

      <h3 className="text-md font-semibold mb-3 text-indigo-700 text-center">
        Select Project Code
      </h3>

      <div className="flex flex-wrap gap-2 justify-center">
        {projectCodesForModal.length > 0 ? (
          projectCodesForModal.map((code, index) => (
            <span
              key={index}
              onClick={() => {
                setSelectedProject(code);
                setShowProjectCard(false);
              }}
              className="inline-flex items-center justify-center bg-indigo-100 
                         text-indigo-800 font-semibold text-xs px-3 py-1 rounded-full 
                         cursor-pointer hover:bg-indigo-200 transition-colors"
            >
              {code}
            </span>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center w-full">
            No project codes available
          </p>
        )}
      </div>
    </div>
  </div>
)}





        </div>
      </div>
    );
  },
   [
    filteredResults,
    selectedColumn,
    selectedTable,
    activeColumn,
    columnSearch,
    selectedProject,
    showProjectCard,
    showViewDetails, // ✅ ADDED showViewDetails to dependencies
    searchTerm, // ✅ ADDED searchTerm to dependencies
    filterTerm, // ✅ ADDED filterTerm to dependencies
  ]
);
  

  

  return renderedResults;
}



//now



//corrected filteredresults
// const filteredResults = useMemo(() => {
//   let data = limitedResults || [];

//   // ✅ Filter by selected project
//   if (
//     selectedProject &&
//     ["IPC_CPC_Code", "Reference_Table", "Report_Data"].includes(selectedTable)
//   ) {
//     data = data.filter((r) => {
//       const codes = r.Project_Code
//         ? r.Project_Code.split(/\s*\|\|\s*|\s*\|\s*/)
//             .map((c) => c.trim())
//             .filter(Boolean)
//         : [];
//       return codes.includes(selectedProject);
//     });
//   }

//   // ✅ Column-level search filter (affected by exactMatch)
//   if (activeColumn && columnSearch) {
//     const search = columnSearch.toLowerCase();
//     data = data.filter((row) => {
//       const value = row[activeColumn];
//       if (!value) return false;
//       const text = value.toString().trim().toLowerCase();
//       return exactMatch ? text === search : text.includes(search);
//     });
//   }

//   // ✅ Global keyword filter (Filter Results input)
//   if (filterTerm.trim() !== "") {
//     const lowerFilter = filterTerm.toLowerCase();
//     data = data.filter((row) =>
//       Object.values(row).some(
//         (val) => val && val.toString().toLowerCase().includes(lowerFilter)
//       )
//     );
//   }

//   return data;
// }, [
//   limitedResults,
//   activeColumn,
//   columnSearch,
//   selectedProject,
//   selectedTable,
//   filterTerm,
//   exactMatch, // ✅ include dependency
// ]);

// ✅ Filter results by project and column search
  // const filteredResults = useMemo(() => {
  //   let data = limitedResults;
  //   // if (selectedProject && selectedTable === "IPC_CPC_Code") {
  //   //   data = data.filter((r) => r.Project_Code === selectedProject);
  //   // }
  //   if (
  //     selectedProject &&
  //     ["IPC_CPC_Code", "Reference_Table", "Report_Data"].includes(selectedTable)
  //   ) {
  //     data = data.filter((r) => r.Project_Code === selectedProject);
  //   }
    
  //   if (!activeColumn || !columnSearch) return data;
  //   return data.filter((row) => {
  //     const value = row[activeColumn];
  //     return (
  //       value &&
  //       value.toString().toLowerCase().includes(columnSearch.toLowerCase())
  //     );
  //   });
  // }, [
  //   limitedResults,
  //   activeColumn,
  //   columnSearch,
  //   selectedProject,
  //   selectedTable,
  // ]);

  //corrected filtered results
//   const filteredResults = useMemo(() => {
//     let data = limitedResults;
  
    
//     // ✅ corrected Filter by selected project
// if (
//   selectedProject &&
//   ["IPC_CPC_Code", "Reference_Table", "Report_Data"].includes(selectedTable)
// ) {
//   data = data.filter((r) => {
//     const codes = r.Project_Code
//       ? r.Project_Code.split(/\s*\|\|\s*|\s*\|\s*/)
//           .map((c) => c.trim())
//           .filter(Boolean)
//       : [];
//     return codes.includes(selectedProject);
//   });
// }

  
//     // ✅ Column-level search filter
//     if (activeColumn && columnSearch) {
//       data = data.filter((row) => {
//         const value = row[activeColumn];
//         return (
//           value &&
//           value.toString().toLowerCase().includes(columnSearch.toLowerCase())
//         );
//       });
//     }
  
//     // ✅ Global keyword filter (from Filter Results input)
//     if (filterTerm.trim() !== "") {
//       const lowerFilter = filterTerm.toLowerCase();
//       data = data.filter((row) =>
//         Object.values(row).some(
//           (val) =>
//             val &&
//             val.toString().toLowerCase().includes(lowerFilter)
//         )
//       );
//     }
  
//     return data;
//   }, [
//     limitedResults,
//     activeColumn,
//     columnSearch,
//     selectedProject,
//     selectedTable,
//     filterTerm, // ✅ add dependency here
//   ]);


  // ✅ Clickable "Type" column for IPC_CPC_Code
  // if (selectedTable === "IPC_CPC_Code" && col === "Type") {
  //   return (
  //     <td
  //       key={colIndex}
  //       className="px-4 py-2 text-xs text-blue-600 font-semibold cursor-pointer hover:underline text-center"
  //       onClick={() => setShowProjectCard(true)}
  //     >
  //       Project
  //     </td>
  //   );
  // }

  // ✅ Show Project_Code as clickable only if it’s not null

// if (selectedTable === "IPC_CPC_Code" && col === "Project_Code") {
//   if (!value) {
//     return (
//       <td key={colIndex} className="px-4 py-2 text-xs text-center text-gray-400">
//         —
//       </td>
//     );
//   }

//   // Split using regex: handles both "|" and "||" separators, trims spaces
//   const codes = value
//   .split(/\s*\|\|\s*|\s*\|\s*/)
//     .map((code) => code.trim())
//     .filter(Boolean);

//   return (
//     <td key={colIndex} className="px-4 py-2 text-xs text-start space-x-2">
//       {codes.map((code, idx) => (
//         <span
//           key={idx}
//           className="text-blue-600 font-semibold cursor-pointer hover:underline"
//           onClick={() => setSelectedProject(code)}
//         >
//           {code}
//         </span>
//       ))}
//     </td>
//   );
// }


          {/* ✅ Project Card Modal */}
{/* {showProjectCard && selectedTable === "IPC_CPC_Code" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
      <h3 className="text-lg font-semibold mb-4 text-indigo-700 text-center">
        Select Project Code
      </h3>

      <div className="max-h-60 overflow-y-auto space-y-2">
        {uniqueProjectCodes.map((code, index) => (
          <p
            key={index}
            className="text-sm text-blue-600 cursor-pointer hover:underline text-center"
            onClick={() => {
              setSelectedProject(code);
              setShowProjectCard(false);
            }}
          >
            {code}
          </p>
        ))}

       
      </div>

      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-lg"
        onClick={() => setShowProjectCard(false)}
      >
        ×
      </button>
    </div>
  </div>
)} */}

{/* coorrected code */}
{/* {showProjectCard && selectedTable === "IPC_CPC_Code" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
      <h3 className="text-lg font-semibold mb-4 text-indigo-700 text-center">
        Select Project Code
      </h3>

      {/* ✅ Grid layout for project codes *
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
        {projectCodesForModal.length > 0 ? (
          projectCodesForModal.map((code, index) => (
            <p
              key={index}
              className="text-sm text-blue-600 cursor-pointer hover:underline text-center border border-gray-200 rounded-md py-1"
              onClick={() => {
                setSelectedProject(code);
                setShowProjectCard(false);
              }}
            >
              {code}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center col-span-full">
            No project codes available
          </p>
        )}
      </div>

      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-lg"
        onClick={() => setShowProjectCard(false)}
      >
        ×
      </button>
    </div>
  </div>
)} */}

{/* updated badge */}
{/* {showProjectCard && selectedTable === "IPC_CPC_Code" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
    <div
      className="bg-white p-6 rounded-xl shadow-lg w-96 absolute"
      style={{
        top: modalPosition.top,
        left: modalPosition.left,
        transform: "translate(-50%, 0)",
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-indigo-700 text-center">
        Select Project Code
      </h3>

      <div className="flex flex-wrap gap-2 justify-center max-h-60 overflow-y-auto">
        {projectCodesForModal.map((code, i) => (
          <span
            key={i}
            onClick={() => {
              setSelectedProject(code);
              setShowProjectCard(false);
            }}
            className="inline-flex items-center justify-center 
                       bg-indigo-100 text-indigo-800 font-semibold 
                       text-xs px-3 py-1 rounded-full cursor-pointer 
                       hover:bg-indigo-200 transition-colors"
          >
            {code}
          </span>
        ))}
      </div>

      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-lg"
        onClick={() => setShowProjectCard(false)}
      >
        ×
      </button>
    </div>
  </div>
)} */}


  {/* Header */}
        {/* <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
          Results
          <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-indigo-700">
            {filteredResults.length || 0}
          </span>
        </span> */}


            {/* <thead
              className="bg-gray-100 text-gray-600 uppercase text-xs"
              style={{ backgroundColor: "#23748C", color: "#dfdfdf" }}
            >
              <tr>
                {columnsToShow
                  .filter((col) => col.toLowerCase() !== "id")
                  .map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-center relative cursor-pointer hover:bg-[#2c8ba3]"
                      onClick={() =>
                        setActiveColumn(activeColumn === header ? null : header)
                      }
                    >
                      {header.replace(/_/g, " ")}
                      {activeColumn === header && (
                        <div className="absolute top-full left-0 mt-1 w-40 bg-white shadow-md border border-gray-300 rounded-md z-10 p-2">
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-2 py-1  focus:ring focus:ring-indigo-200 outline-none"
                            placeholder={`Search ${header}`}
                            value={columnSearch}
                            onChange={(e) => setColumnSearch(e.target.value)}
                            autoFocus
                          />
                        </div>
                      )}
                    </th>
                  ))}
              </tr>
            </thead> */}