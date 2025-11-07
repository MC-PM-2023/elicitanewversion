// import React from 'react';
// import { motion } from 'framer-motion';

// export default function ColumnSelector({
//   columns,
//   multiColumns,
//   onSelect,
//   openModal,
//   selectedColumn,
//   selectedTable,
// }) {
//   const columnVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.03,
//         type: 'spring',
//         stiffness: 120,
//         damping: 12,
//       },
//     }),
//   };

//   const colorMap = {
//     'Assignee_Table': '#8e44ad',
//     'IPC_CPC_Code': '#3f51b5',
//     'Reference_Table': '#009688',
//     'Report_Data': '#ffc107',
//     'Strings': '#cddc39',
//   };

//   const isRelated = (table) => table === selectedTable;

//   return (
//     // <div
//     //   className={`column-grid ${
//     //     selectedColumn ? 'selection-active' : ''
//     //   } grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8  gap-4 mb-1  border border-gray-200  shadow-md p-4  mb-4 rounded-2xl`}
//     // >
  
//     <div
//     className={`column-grid ${selectedColumn ? 'selection-active' : ''} 
//       grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10
//     gap-2 border border-gray-200 shadow-md p-4 rounded-2xl overflow-hidden`}
//     style={{
//       // 2 rows * button height + 1 gap
//       maxHeight: 'calc(4 * 3.5rem + 1rem)',
     
//     }}
      
//   >
  


      
  


//   {/* Multi-columns that open modal */}


// {Object.keys(multiColumns).filter((colName)=>colName.toLowerCase()!=="id" ).map((colName, idx) => {

//   const baseColor = colorMap[colName] || '#ccc';
//   const isRelated = colName === selectedTable;
//   const isSelected = false; // Multi-columns are never 'selected' directly
  
//   return (
//     <motion.button
//       key={colName}
//       custom={idx}
//       initial="hidden"
//       animate="visible"
//       variants={columnVariants}
//       onClick={() => openModal(colName)}
      
//       className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
//       id="columnselector"
//       style={{
//         backgroundColor: isRelated ? baseColor + '55' : '#fff', // lighter for related
//         color: isRelated ? '#000' : '#000', // always black text for multi-columns
//       }}
//     >
//       <span className="font-normal text-[13px]">
//         {colName.replace(/_/g, ' ')}
//       </span>
//     </motion.button>
//   );
// })}

//       {/* Single column selectors */}
   

// {columns.map((col, idx) => {
//   const isSelected = selectedColumn === col.column && selectedTable === col.table;
  
//   const related = isRelated(col.table);
//   const baseColor = colorMap[col.table] || '#888';
//   let textColor='#000';
//   if(isSelected) textColor="#fff";
//   else if(related) textColor='#000';

//   return (
//     <motion.button
//       key={`${col.table}-${col.column}`}
//       custom={idx}
//       initial="hidden"
//       animate="visible"
//       id="columnselector"
//       variants={columnVariants}
//       onClick={() => onSelect(col.column, col.table)}
//       data-table={col.table}
//       data-column={col.column}
//       className="column-btn group flex flex-col  items-start text-left p-2 rounded-lg shadow-md transition-all"
      
//       style={{
//         backgroundColor: isSelected
//           ? baseColor
//           : related
//           ? baseColor + '65'
//           : '#fff',
//         // color: isSelected || related ? '#404040' : '#000',
//         color:textColor
//       }}
//     >
//       <span className="text-[13px]" >
//         {col.column.replace(/_/g, ' ')}
//       </span>
//     </motion.button>


//   );
// })}

//     </div>
//   );
// }


//corrected code

// import React from 'react';
// import { motion } from 'framer-motion';

// export default function ColumnSelector({
//   columns,
//   multiColumns,
//   onSelect,
//   openModal,
//   selectedColumn,
//   selectedTable,
// }) {
//   const columnVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.03,
//         type: 'spring',
//         stiffness: 120,
//         damping: 12,
//       },
//     }),
//   };

//   const colorMap = {
//     Assignee_Table: '#8e44ad',
//     IPC_CPC_Code: '#3f51b5',
//     Reference_Table: '#009688',
//     Report_Data: '#ffc107',
//     Strings: '#cddc39',
//   };

//   const isRelated = (table) => table === selectedTable;

//   return (
//     // <div
//     //   className={`column-grid ${selectedColumn ? 'selection-active' : ''} 
//     //   grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10
//     //   gap-2 border border-gray-200 shadow-md p-4 rounded-2xl overflow-hidden`}
//     //   style={{
//     //     maxHeight: 'calc(4 * 3.5rem + 1rem)',
//     //   }}
//     // >

//     <div
//   className={`column-grid ${selectedColumn ? 'selection-active' : ''} 
//     grid grid-cols-9 gap-2 border border-gray-200 shadow-md p-4 rounded-2xl overflow-hidden`}
//   style={{
//     maxHeight: 'calc(4 * 3.5rem + 1rem)',
//   }}
// >

//       {/* Multi-columns that open modal */}
//       {Object.keys(multiColumns)
//         .filter(
//           (colName) =>
//             colName.toLowerCase() !== 'id' &&
//             colName.toLowerCase() !== 'strings_hits' // 🟡 Remove Strings_Hits
//         )
//         .map((colName, idx) => {
//           const baseColor = colorMap[colName] || '#ccc';
//           const isRelated = colName === selectedTable;

//           return (
//             <motion.button
//               key={colName}
//               custom={idx}
//               initial="hidden"
//               animate="visible"
//               variants={columnVariants}
//               onClick={() => openModal(colName)}
//               className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
//               id="columnselector"
//               style={{
//                 backgroundColor: isRelated ? baseColor + '55' : '#fff',
//                 color: '#000',
//               }}
//             >
//               <span className="font-normal text-[13px]">
//                 {colName.replace(/_/g, ' ')}
//               </span>
//             </motion.button>
//           );
//         })}

//       {/* Single column selectors */}
//       {columns
//         .filter(
//           (col) => col.column.toLowerCase() !== 'strings_hits' // 🟡 Filter out Strings_Hits
//         )
//         .map((col, idx) => {
//           const isSelected =
//             selectedColumn === col.column && selectedTable === col.table;

//           const related = isRelated(col.table);
//           const baseColor = colorMap[col.table] || '#888';
//           let textColor = '#000';
//           if (isSelected) textColor = '#fff';
//           else if (related) textColor = '#000';

//           return (
//             <motion.button
//               key={`${col.table}-${col.column}`}
//               custom={idx}
//               initial="hidden"
//               animate="visible"
//               id="columnselector"
//               variants={columnVariants}
//               onClick={() => onSelect(col.column, col.table)}
//               data-table={col.table}
//               data-column={col.column}
//               className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
//               style={{
//                 backgroundColor: isSelected
//                   ? baseColor
//                   : related
//                   ? baseColor + '65'
//                   : '#fff',
//                 color: textColor,
//               }}
//             >
//               <span className="text-[13px]">
//                 {col.column.replace(/_/g, ' ')}
//               </span>
//             </motion.button>
//           );
//         })}
//     </div>
//   );
// }






// import React from "react";
// import { motion } from "framer-motion";

// export default function ColumnSelector({
//   columns,
//   multiColumns,
//   onSelect,
//   openModal,
//   selectedColumn,
//   selectedTable,
// }) {
//   const columnVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.03,
//         type: "spring",
//         stiffness: 120,
//         damping: 12,
//       },
//     }),
//   };

//   // 🎨 Table color map (for actual table names)
//   const colorMap = {
//     Assignee_Table: "#8e44ad",
//     IPC_CPC_Code: "#3f51b5",
//     Reference_Table: "#009688",
//     Report_Data: "#ffc107",
//     Strings: "#cddc39",
//   };



//   return (
//     <div
//       className={`column-grid ${
//         selectedColumn ? "selection-active" : ""
//       } grid grid-cols-9 gap-2 border border-gray-200 shadow-md p-4 rounded-2xl overflow-hidden`}
//       style={{
//         maxHeight: "calc(4 * 3.5rem + 1rem)",
//       }}
//     >
//       {/* 🟢 Multi-columns (Project Code, Docket, etc.) */}
//       {Object.keys(multiColumns)
//         .filter(
//           (colName) =>
//             colName.toLowerCase() !== "id" &&
//             colName.toLowerCase() !== "strings_hits"
//         )
//         .map((colName, idx) => {
//           // ✅ Detect if any sub-table is currently selected
//           const isAnySubTableSelected = multiColumns[colName]?.some(
//             (tbl) => tbl.table === selectedTable
//           );

//           // ✅ Find the selected sub-table (to extract color)
//           const selectedSubTable = multiColumns[colName]?.find(
//             (tbl) => tbl.table === selectedTable
//           );

//           // ✅ Use the sub-table’s color dynamically
//           const baseColor =
//             colorMap[selectedSubTable?.table] || "#ccc"; // fallback color if not matched

//           return (
//             <motion.button
//               key={colName}
//               custom={idx}
//               initial="hidden"
//               animate="visible"
//               variants={columnVariants}
//               onClick={() => openModal(colName)}
//               id="columnselector"
//               className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
//               style={{
//                 backgroundColor: isAnySubTableSelected ? baseColor : "#fff",
//                 color: isAnySubTableSelected ? "#fff" : "#000",
//                 border: isAnySubTableSelected
//                   ? `2px solid ${baseColor}`
//                   : "1px solid #ccc",
//               }}
//             >
//               <span className="font-normal text-[13px]">
//                 {colName.replace(/_/g, " ")}
//               </span>
//             </motion.button>
//           );
//         })}

//       {/* 🟡 Single-column buttons */}
//       {columns
//         .filter((col) => col.column.toLowerCase() !== "strings_hits")
//         .map((col, idx) => {
//           const baseColor = colorMap[col.table] || "#888";

//           const isSelected =
//             selectedColumn === col.column && selectedTable === col.table;

//           // check if this column belongs to a multi-column group
//           const belongsToMulti = Object.values(multiColumns).some((group) =>
//             group.some((t) => t.table === col.table)
//           );

//           const isActiveSubTable = selectedTable === col.table;

//           return (
//             <motion.button
//               key={`${col.table}-${col.column}`}
//               custom={idx}
//               initial="hidden"
//               animate="visible"
//               variants={columnVariants}
//               onClick={() => onSelect(col.column, col.table)}
//               id="columnselector"
//               className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
//               style={{
//                 backgroundColor:
//                   isSelected || (isActiveSubTable && belongsToMulti)
//                     ? baseColor
//                     : "#fff",
//                 color:
//                   isSelected || (isActiveSubTable && belongsToMulti)
//                     ? "#fff"
//                     : "#000",
//                 border:
//                   isSelected || (isActiveSubTable && belongsToMulti)
//                     ? `2px solid ${baseColor}`
//                     : "1px solid #ccc",
//               }}
//             >
//               <span className="text-[13px]">
//                 {col.column.replace(/_/g, " ")}
//               </span>
//             </motion.button>
//           );
//         })}
//     </div>
//   );
// }


// import React from "react";
// import { motion } from "framer-motion";

// export default function ColumnSelector({
//   columns,
//   multiColumns,
//   onSelect,
//   openModal,
//   selectedColumn,
//   selectedTable,
// }) {
//   const columnVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.03,
//         type: "spring",
//         stiffness: 120,
//         damping: 12,
//       },
//     }),
//   };

//   // 🎨 Table color map (for actual table names)
//   const colorMap = {
//     Assignee_Table: "#8e44ad",
//     IPC_CPC_Code: "#3f51b5",
//     Reference_Table: "#009688",
//     Report_Data: "#ffc107",
//     Strings: "#cddc39",
//   };

//   // Function to lighten or darken a color
//   const adjustColorBrightness = (hex, percent) => {
//     const num = parseInt(hex.replace("#", ""), 16);
//     const amt = Math.round(2.55 * percent);
//     const R = (num >> 16) + amt;
//     const G = ((num >> 8) & 0x00ff) + amt;
//     const B = (num & 0x0000ff) + amt;
//     return (
//       "#" +
//       (
//         0x1000000 +
//         (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
//         (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
//         (B < 255 ? (B < 0 ? 0 : B) : 255)
//       )
//         .toString(16)
//         .slice(1)
//     );
//   };

//   return (
//     <div
//       className={`column-grid ${
//         selectedColumn ? "selection-active" : ""
//       } grid grid-cols-9 gap-2 border border-gray-200 shadow-md p-4 rounded-2xl overflow-hidden`}
//       style={{
//         maxHeight: "calc(4 * 3.5rem + 1rem)",
//       }}
//     >
//       {/* 🟢 Multi-columns (Project Code, Docket, etc.) */}
//       {Object.keys(multiColumns)
//         .filter(
//           (colName) =>
//             colName.toLowerCase() !== "id" &&
//             colName.toLowerCase() !== "strings_hits"
//         )
//         .map((colName, idx) => {
//           const allSubTables = multiColumns[colName];
//           const isSelectedMainTable = allSubTables.some(
//             (tbl) => tbl.table === selectedTable
//           );
//           const baseColor =
//             colorMap[selectedTable] ||
//             colorMap[allSubTables[0]?.table] ||
//             "#ccc";

//           const bgColor = isSelectedMainTable
//             ? baseColor // dark color for selected main table
//             : isSelectedMainTable
//             ? adjustColorBrightness(baseColor, 40) // light for related
//             : "#fff";

//           const textColor = isSelectedMainTable
//             ? "#fff"
//             : "#000"; // white for selected, black for related

//           return (
//             <motion.button
//               key={colName}
//               custom={idx}
//               initial="hidden"
//               animate="visible"
//               variants={columnVariants}
//               onClick={() => openModal(colName)}
//               id="columnselector"
//               className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
//               style={{
//                 backgroundColor: bgColor,
//                 color: textColor,
//                 border: isSelectedMainTable
//                   ? `2px solid ${baseColor}`
//                   : "1px solid #ccc",
//               }}
//             >
//               <span className="font-normal text-[13px]">
//                 {colName.replace(/_/g, " ")}
//               </span>
//             </motion.button>
//           );
//         })}

//       {/* 🟡 Single-column buttons */}
//       {columns
//         .filter((col) => col.column.toLowerCase() !== "strings_hits")
//         .map((col, idx) => {
//           const baseColor = colorMap[col.table] || "#888";
//           const isSelected =
//             selectedColumn === col.column && selectedTable === col.table;
//           const isSameTable = selectedTable === col.table;

//           const bgColor = isSelected
//             ? baseColor // selected column
//             : isSameTable
//             ? adjustColorBrightness(baseColor, 40) // same table → lighter
//             : "#fff"; // unrelated → white

//           const textColor = isSelected
//             ? "#fff" // white for selected
//             : "#000"; // black for related/unselected

//           return (
//             <motion.button
//               key={`${col.table}-${col.column}`}
//               custom={idx}
//               initial="hidden"
//               animate="visible"
//               variants={columnVariants}
//               onClick={() => onSelect(col.column, col.table)}
//               id="columnselector"
//               className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
//               style={{
//                 backgroundColor: bgColor,
//                 color: textColor,
//                 border: isSelected || isSameTable
//                   ? `2px solid ${baseColor}`
//                   : "1px solid #ccc",
//               }}
//             >
//               <span className="text-[13px]">
//                 {col.column.replace(/_/g, " ")}
//               </span>
//             </motion.button>
//           );
//         })}
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";

export default function ColumnSelector({
  columns,
  multiColumns,
  onSelect,
  openModal,
  selectedColumn,
  selectedTable,
}) {
  const columnVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  // 🎨 Table color map (for actual table names)
  const colorMap = {
    Assignee_Table: "#8e44ad",
    IPC_CPC_Code: "#3f51b5",
    Reference_Table: "#009688",
    Report_Data: "#ffc107",
    Strings: "#cddc39",
  };

  // Function to lighten or darken a color
  const adjustColorBrightness = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  return (
    <div
      className={`column-grid ${
        selectedColumn ? "selection-active" : ""
      } grid grid-cols-9 gap-2 border border-gray-200 shadow-md p-4 rounded-2xl overflow-hidden`}
      style={{
        maxHeight: "calc(4 * 3.5rem + 1rem)",
      }}
    >
      {/* 🟢 Multi-columns (Project Code, Docket, etc.) */}
      {Object.keys(multiColumns)
        .filter(
          (colName) =>
            colName.toLowerCase() !== "id" &&
            colName.toLowerCase() !== "strings_hits"
        )
        .map((colName, idx) => {
          const allSubTables = multiColumns[colName];

          // Highlight multi-column button ONLY if selectedColumn matches this multi-column group
          const isSelectedGroup = selectedColumn === colName;

          // Pick color from first sub-table or selectedTable, fallback to gray
          const baseColor =
            colorMap[selectedTable] || colorMap[allSubTables[0]?.table] || "#ccc";

          const bgColor = isSelectedGroup ? baseColor : "#fff";
          const textColor = isSelectedGroup ? "#fff" : "#000";

          return (
            <motion.button
              key={colName}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={columnVariants}
              onClick={() => openModal(colName)}
              id="columnselector"
              className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                border: isSelectedGroup ? `2px solid ${baseColor}` : "1px solid #ccc",
              }}
            >
              <span className="font-normal text-[13px]">
                {colName.replace(/_/g, " ")}
              </span>
            </motion.button>
          );
        })}

      {/* 🟡 Single-column buttons */}
      {columns
        .filter((col) => col.column.toLowerCase() !== "strings_hits")
        .map((col, idx) => {
          const baseColor = colorMap[col.table] || "#888";
          const isSelected =
            selectedColumn === col.column && selectedTable === col.table;

          const isSameTable = selectedTable === col.table;

          const bgColor = isSelected
            ? baseColor // selected column
            : isSameTable
            ? adjustColorBrightness(baseColor, 40) // same table → lighter
            : "#fff"; // unrelated → white

          const textColor = isSelected ? "#fff" : "#000";

          return (
            <motion.button
              key={`${col.table}-${col.column}`}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={columnVariants}
              onClick={() => onSelect(col.column, col.table)}
              id="columnselector"
              className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                border:
                  isSelected || isSameTable
                    ? `2px solid ${baseColor}`
                    : "1px solid #ccc",
              }}
            >
              <span className="text-[13px]">
                {col.column.replace(/_/g, " ")}
              </span>
            </motion.button>
          );
        })}
    </div>
  );
}

