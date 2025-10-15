
//table layout

// import React from 'react';
// import { motion } from 'framer-motion';

// const tableVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: 'easeOut' },
//   },
// };

// const rowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.03,
//       duration: 0.3,
//       ease: 'easeOut',
//     },
//   }),
// };





// export default function ResultsTable({ results }) {
//   if (!results || results.length === 0) {
  
//     return (
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="text-center text-gray-500 text-xs"
        
//       >
//         Search results will appear here.
//       </motion.p>
//     );
//   }

//   const headers = Object.keys(results[0]);
// // console.log(results)
//   return (
  


//     <motion.div
//   className="overflow-x-auto max-h-[500px] overflow-y-auto"
//   variants={tableVariants}
//   initial="hidden"
//   animate="visible"
// >
//   <span className="inline-flex flex-col items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/30 mb-3">
//     Results: {results.length ||0}
//   </span>
//   <motion.table
//     className="min-w-full divide-y divide-gray-200 rounded-lg shadow-sm"
   
//   >
   
    
//     <thead className="bg-gray-200 sticky top-0 z-10">
//       <tr>
//         {headers.map((h, idx) => (
//           <th
//             key={idx}
//             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//           >
//             {h.replace(/_/g, ' ')} 
//           </th>
//         ))}
//       </tr>
//     </thead>

//     <tbody className="bg-white divide-y divide-gray-200">
//       {results.map((row, rIdx) => (
//         <motion.tr
//           key={rIdx}
//           variants={rowVariants}
//           custom={rIdx}
//           initial="hidden"
//           animate="visible"
//           className="hover:bg-gray-50 transition-colors text-justify"
//         >
//           {headers.map((h, cIdx) => (
//             <td
//               key={cIdx}
//               className="px-6 py-4 whitespace-wrap text-sm text-gray-700"
//             >
//               {row[h]}
//             </td>
//           ))}
//         </motion.tr>
//       ))}
//     </tbody>

    
//   </motion.table>
// </motion.div>


    

//   );
// }

//card layout

import { motion } from "framer-motion";
import { Star } from "lucide-react"; // Make sure you're importing Star correctly
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};



export default function ResultsTable({ results,addModal,setAddModal}) {

const [showViewDetails,setShowViewDetails]=useState(false)

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

  // console.log("Results:",results)


  return (
    <motion.div
    className=" space-y-1"
    initial="hidden"
    animate="visible"
  >
<span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
  Results
  <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-white rounded-full bg-indigo-500">
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
        {/* {Object.entries(item).map(([key, value]) => (
          <div key={key} className="mb-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {key.replace(/_/g, " ")}
            </p>
            <p className="text-xs font-semibold text-gray-800 text-justify" title={value}>
              {value !== null && value !== "" ? value.toString() : "—"}
            </p>
          </div>
        ))} */}

{Object.entries(item).map(([key, value]) => {
  const stringValue = value !== null && value !== "" ? value.toString() : "—";
  const displayValue =
    !showViewDetails && stringValue.length > 500
      ? `${stringValue.slice(0, 500)}...`
      : stringValue;

  return (
    <div key={key} className="mb-3">

    
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{key.replace(/_/g, " ")} </p>
      <p
        className="text-sm font-semibold text-gray-800 text-justify"
        title={stringValue}
      >
           {displayValue}
      </p>
    </div>
  );
})}


       

{/* <div className="mt-4 text-right">
      
        </div>
        <button className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all cursor-pointer">

  </button> */}

<div className="mt-4 text-right flex justify-end gap-2">
<button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all" onClick={()=>setShowViewDetails(!showViewDetails)}>
            { showViewDetails?<EyeOff/> :<Eye/> }
          </button>
  {/* <button className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all cursor-pointer" onClick={()=>setAddModal(!addModal)}>
  <SquarePen />
  </button> */}
</div>

        
      </motion.div>
    ))}
  </motion.div>
  );
}


//react virutalizer



// import React, { useRef, useState } from "react";
// import { useVirtualizer } from "@tanstack/react-virtual";
// import { Eye, EyeOff, SquarePen } from "lucide-react";

// export default function ResultsTable({ results, addModal, setAddModal }) {
//   const [showViewDetails, setShowViewDetails] = useState(false);

//   const parentRef = useRef();

//   if (!results || results.length === 0) {
//     return (
//       <p className="text-center text-gray-500 text-xs mt-10">
//         Search results will appear here.
//       </p>
//     );
//   }

//   const rowVirtualizer = useVirtualizer({
//     count: results.length,
//     getScrollElement: () => parentRef.current,
//     estimateSize: () => 380, // Adjust this to match your row/card height
//     overscan: 5,
//   });

//   return (
//     <div className="space-y-2">
//       <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
//         Results
//         <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-[12px] font-semibold text-white rounded-full bg-indigo-500">
//           {results.length}
//         </span>
//       </span>

//       <div
//         ref={parentRef}
//         // className="h-[700px] overflow-auto relative"
//       >
//         <div
//           style={{
//             height: `${rowVirtualizer.getTotalSize()}px`,
//             width: "100%",
//             position: "relative",
//           }}
//         >
//           {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//             const item = results[virtualRow.index];
//             return (
//               <div
//                 key={virtualRow.key}
//                 ref={rowVirtualizer.measureElement}
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   transform: `translateY(${virtualRow.start}px)`,
//                 }}
//                 className="p-2"
//               >
//                 <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow ">
//                   {Object.entries(item).map(([key, value]) => {
//                     const stringValue =
//                       value != null && value !== "" ? value.toString() : "—";
//                     const displayValue =
//                       !showViewDetails && stringValue.length > 500
//                         ? `${stringValue.slice(0, 500)}...`
//                         : stringValue;

//                     return (
//                       <div key={key} className="mb-3">
//                         <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
//                           {key.replace(/_/g, " ")}
//                         </p>
//                         <p
//                           className="text-sm font-semibold text-gray-800 text-justify"
//                           title={stringValue}
//                         >
//                           {displayValue}
//                         </p>
//                       </div>
//                     );
//                   })}

//                   <div className="mt-4 text-right flex justify-end gap-2">
//                     <button
//                       className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md"
//                       onClick={() => setShowViewDetails(!showViewDetails)}
//                     >
//                       {showViewDetails ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                     <button
//                       className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-md"
//                       onClick={() => setAddModal(!addModal)}
//                     >
//                       <SquarePen size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
