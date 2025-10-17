// import React, { useState, useMemo ,useEffect} from "react";
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


// // Map of table -> columns to show as cards
// const CARD_COLUMNS = {
//   Reference_Table: ["Relevant_Excerpts", "Reference_No","Observation","Rating_of_Reference","Project_Title","Docket","Project_Code,id"], // add columns you want
//   Report_Data: ["Understanding", "Key_Feature", "Overall_Rating","Project_Title","Docket","Project_Code","id"],
// };




// export default function ResultsTable({ results, selectedColumn,selectedTable }) {
//   const [showViewDetails, setShowViewDetails] = useState(false);
//   console.log("Result is:",results)

//  useEffect(()=>{
// setShowViewDetails(true)
//  },[selectedColumn])

//   // ✅ Memoize results content for faster UI response
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

//     // ✅ CASE 1: Show cards for "Relevant_Excerpts"
   
//     if (selectedColumn === "Relevant_Excerpts") {
//       return (
//         <motion.div className="space-y-3" initial="hidden" animate="visible">
//           <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
//             Results
//             <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-indigo-700 rounded-full">
//               {results.length || 0}
//             </span>
//           </span>

//           {results.map((item, idx) => (
//             <motion.div
//               key={idx}
//               custom={idx}
//               variants={cardVariants}
//               className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow"
//             >
//               {Object.entries(item).map(([key, value]) => {
//                 const stringValue =
//                   value !== null && value !== "" ? value.toString() : "—";
//                 const displayValue =
//                   !showViewDetails && stringValue.length > 500
//                     ? `${stringValue.slice(0, 500)}...`
//                     : stringValue;

//                 return (
//                   <div key={key} className="mb-3">
//                     <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
//                       {key.replace(/_/g, " ")}
//                     </p>
                  
//                     <p
//                       className="text-sm font-semibold text-gray-800 text-justify"
//                       title={stringValue}
//                     >
//                       {displayValue}
//                     </p>
//                   </div>
//                 );
//               })}

//               <div className="mt-4 text-right flex justify-end gap-2">
//                 <button
//                   className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
//                   onClick={() => setShowViewDetails(!showViewDetails)}
//                 >
//                   {showViewDetails ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       );
//     }

//     // ✅ CASE 2: Show table for other columns
//     return (
//       <div>
//            <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
//             Results
//             <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-indigo-700 ">
//               {results.length || 0}
//             </span>
//           </span>
     
//       <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md mt-4">
//         <table className="min-w-full text-sm text-gray-700">
//           <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//             <tr>
//               {Object.keys(results[0]).map((header) => (
//                 <th key={header} className="px-4 py-2 text-left">
//                   {header.replace(/_/g, " ")}
//                 </th>
//               ))}
             
//             </tr>
//           </thead>
//           <tbody>
//             {results.map((row, rowIndex) => (
//               <tr key={rowIndex} className="border-b hover:bg-gray-50">
//                 {Object.values(row).map((value, colIndex) => (
//                   <td
//                     key={colIndex}
//                     className="px-4 py-2 text-gray-800 text-xs break-words"
//                   >
//                     {value !== null && value !== "" ? value.toString() : "—"}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       </div>
//     );
//   }, [results, selectedColumn,selectedTable ,showViewDetails]); // Only re-render when data or column changes

//   // ✅ Return memoized JSX
//   return renderedResults;
// }

//corrected code for selected table show cards,tables

import React, { useState, useMemo, useEffect } from "react";
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

// Map of table -> columns to show as cards
const CARD_COLUMNS = {
  Reference_Table: ["Relevant_Excerpts", "Reference_No","Observation","Rating_of_Reference","Project_Title","Docket","Project_Code","id"],
  Report_Data: ["Understanding", "Key_Feature", "Overall_Rating","Project_Title","Docket","Project_Code","id"],
};

export default function ResultsTable({ results, selectedColumn, selectedTable }) {
  const [showViewDetails, setShowViewDetails] = useState(false);

  useEffect(() => {
    setShowViewDetails(true);
  }, [selectedColumn]);

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

    // ✅ CASE: Show cards for tables in CARD_COLUMNS
    if (CARD_COLUMNS[selectedTable]) {
      const columnsToShow = CARD_COLUMNS[selectedTable];
      return (
        <motion.div className="space-y-3" initial="hidden" animate="visible">
          <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
            Results
            <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-indigo-700 rounded-full">
              {results.length || 0}
            </span>
          </span>

          {results.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {columnsToShow.map((key) => {
                const value = item[key];
                const stringValue = value !== null && value !== "" ? value.toString() : "—";
                const displayValue =
                  !showViewDetails && stringValue.length > 500
                    ? `${stringValue.slice(0, 500)}...`
                    : stringValue;

                return (
                  <div key={key} className="mb-3">
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p
                      className="text-sm font-semibold text-gray-800 text-justify"
                      title={stringValue}
                    >
                      {displayValue}
                    </p>
                  </div>
                );
              })}

              <div className="mt-4 text-right flex justify-end gap-2">
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
                  onClick={() => setShowViewDetails(!showViewDetails)}
                >
                  {showViewDetails ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }

    // ✅ CASE: Show table for other tables
    return (
      <div>
        <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
          Results
          <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-indigo-700 ">
            {results.length || 0}
          </span>
        </span>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md mt-4">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                {Object.keys(results[0]).map((header) => (
                  <th key={header} className="px-4 py-2 text-left">
                    {header.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b hover:bg-gray-50">
                  {Object.values(row).map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 text-gray-800 text-xs break-words"
                    >
                      {value !== null && value !== "" ? value.toString() : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }, [results, selectedColumn, selectedTable, showViewDetails]);

  return renderedResults;
}
