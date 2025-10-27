

import React from 'react';
import { motion } from 'framer-motion';

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
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  const colorMap = {
    'Assignee_Table': '#8e44ad',
    'IPC_CPC_Code': '#3f51b5',
    'Reference_Table': '#009688',
    'Report_Data': '#ffc107',
    'Strings': '#cddc39',
  };

  const isRelated = (table) => table === selectedTable;

  return (
    // <div
    //   className={`column-grid ${
    //     selectedColumn ? 'selection-active' : ''
    //   } grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8  gap-4 mb-1  border border-gray-200  shadow-md p-4  mb-4 rounded-2xl`}
    // >
  
    <div
    className={`column-grid ${selectedColumn ? 'selection-active' : ''} 
      grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10
    gap-2 border border-gray-200 shadow-md p-4 rounded-2xl overflow-hidden`}
    style={{
      // 2 rows * button height + 1 gap
      maxHeight: 'calc(4 * 3.5rem + 1rem)',
     
    }}
      
  >
  


      
  


  {/* Multi-columns that open modal */}


{Object.keys(multiColumns).filter((colName)=>colName.toLowerCase()!=="id").map((colName, idx) => {

  const baseColor = colorMap[colName] || '#ccc';
  const isRelated = colName === selectedTable;
  const isSelected = false; // Multi-columns are never 'selected' directly
  
  return (
    <motion.button
      key={colName}
      custom={idx}
      initial="hidden"
      animate="visible"
      variants={columnVariants}
      onClick={() => openModal(colName)}
      className="column-btn group flex flex-col items-start text-left p-2 rounded-lg shadow-md transition-all"
      id="columnselector"
      style={{
        backgroundColor: isRelated ? baseColor + '55' : '#fff', // lighter for related
        color: isRelated ? '#000' : '#000', // always black text for multi-columns
      }}
    >
      <span className="font-normal text-[13px]">
        {colName.replace(/_/g, ' ')}
      </span>
    </motion.button>
  );
})}

      {/* Single column selectors */}
   

{columns.map((col, idx) => {
  const isSelected = selectedColumn === col.column && selectedTable === col.table;
  
  const related = isRelated(col.table);
  const baseColor = colorMap[col.table] || '#888';
  let textColor='#000';
  if(isSelected) textColor="#fff";
  else if(related) textColor='#000';

  return (
    <motion.button
      key={`${col.table}-${col.column}`}
      custom={idx}
      initial="hidden"
      animate="visible"
    
      variants={columnVariants}
      onClick={() => onSelect(col.column, col.table)}
      data-table={col.table}
      data-column={col.column}
      className="column-btn group flex flex-col  items-start text-left p-2 rounded-lg shadow-md transition-all"
      
      style={{
        backgroundColor: isSelected
          ? baseColor
          : related
          ? baseColor + '65'
          : '#fff',
        // color: isSelected || related ? '#404040' : '#000',
        color:textColor
      }}
    >
      <span className="text-[13px]" >
        {col.column.replace(/_/g, ' ')}
      </span>
    </motion.button>


  );
})}

    </div>
  );
}












  {/* Single column selectors */}
   {/* {columns.map((col, idx) => {
        const isSelected = selectedColumn === col.column && selectedTable === col.table;
        const related = isRelated(col.table);
        const baseColor = colorMap[col.table] || '#888';

        return (
          <motion.button
            key={`${col.table}-${col.column}`}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={columnVariants}
            onClick={() => onSelect(col.column, col.table)}
            data-table={col.table}
            data-column={col.column}
            className="column-btn flex flex-col items-start text-left p-3 rounded-lg shadow-md transition-all"
            style={{
              backgroundColor: isSelected
                ? baseColor
                : related
                ? baseColor + '65' // transparent for related
                : '#fff',
              color: isSelected || related ? '#404040' : '#000',
              
             
            }}
          >
            <span className=" text-xs  p-2">
              {col.column.replace(/_/g, ' ')}
            </span>
          </motion.button>
        );
      })} */}


            {/* Multi-columns that open modal */}
      {/* {Object.keys(multiColumns).map((colName, idx) => (
        <motion.button
          key={colName}
          custom={idx}
          initial="hidden"
          animate="visible"
          variants={columnVariants}
          onClick={() => openModal(colName)}
          className="column-btn group flex flex-col items-start text-left p-3 rounded-lg shadow-md transition-all"
          style={{
            backgroundColor: '#fff',
            color: '#00000',
          }}
        />
      ))} */}

{/* {Object.keys(multiColumns).map((colName, idx) => (
  <motion.button
    key={colName}
    custom={idx}
    initial="hidden"
    animate="visible"
    variants={columnVariants}
    onClick={() => openModal(colName)}
    className="column-btn group flex flex-col items-start text-left p-3 rounded-lg shadow-md transition-all"
    style={{
      backgroundColor: '#fff',
      color: '#000',
    }}
  >
    <span className="font-semibold text-xs">
      {colName.replace(/_/g, ' ')}
    </span>
  </motion.button>
))} */}






// import React from 'react';
// import { motion } from 'framer-motion';

// export default function ColumnSelector({
//   columns,
//   multiColumns,
//   onSelect,
//   openModal,
//   selectedColumn,
//   selectedTable,
//   colorMap
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
//         damping: 12
//       }
//     })
//   };
  

 

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-4 mb-1  border border-gray-200 rounded-2xl shadow-md p-4 bg-white mb-4 ">
//       {/* Multi-columns that open modal */}
//       {Object.keys(multiColumns).map((colName, idx) => (
//         <motion.div
//           key={colName}
//           custom={idx}
//           initial="hidden"
//           animate="visible"
//           variants={columnVariants}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={() => openModal(colName)}
//           className="cursor-pointer bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center space-y-2 text-gray-600 border border-gray-200 transition-all hover:shadow-lg text-xs"
        
//         >
//           <span className="font-medium">{colName.replace(/_/g, ' ')}</span>
//           {/* <span className="text-xs text-purple-500">Select table</span> */}
//         </motion.div>
//       ))}

//       {/* Directly selectable columns */}
//       {columns.map((col, idx) => {
//         const isSelected =
//           selectedColumn === col.column && selectedTable === col.table;
//           const tableColor=colorMap[col.table] ||"gray"
//         return (
//           <motion.div
//             key={`${col.table}-${col.column}`}
//             custom={idx}
//             initial="hidden"
//             animate="visible"
//             variants={columnVariants}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => onSelect(col.column, col.table)}
//             className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 border transition-all ${
//               isSelected
//                 ? `bg-${tableColor}-200 border-${tableColor}-500 text-${tableColor}-800 shadow-lg`
//                 : `bg-white border-${tableColor}-300 text-gray-600 shadow-md hover:shadow-lg`
//             }`}
         
       

//           >
//             <span className="font-medium text-xs">
//               {col.column.replace(/_/g, ' ')}
//             </span>
//             {/* <span className="text-xs text-gray-400">{col.table.replace(/_/g, ' ')}</span> */}
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }


// import React, { useEffect } from 'react';
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
//         damping: 12
//       }
//     })
//   };

//   // Get color variables from colorMap
  


//   const colorMap = {
//     'Assignee_Table': '#8e44ad',
//     'IPC_CPC_Code': '#3f51b5',
//     'Reference_Table': '#009688',
//     'Report_Data': '#ffc107',
//     'Strings': '#cddc39'
//   };
  
//   const getColorVars = (table) => {
//     const base = colorMap[table] || '#888';
//     return {
//       '--color': base,
//       '--color-shadow': 'rgba(0,0,0,0.2)'
//     };
//   };
  

//   // Merge related styling
//   const isRelated = (table) => table === selectedTable;

//   return (
//     <div
//       className={`column-grid ${
//         selectedColumn ? 'selection-active' : ''
//       } grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-2`}
//     >
//       {/* Multi-columns that open modal */}
//       {Object.keys(multiColumns).map((colName, idx) => (
//         <motion.button
//           key={colName}
//           custom={idx}
//           initial="hidden"
//           animate="visible"
//           variants={columnVariants}
//           onClick={() => openModal(colName)}
//           className="column-btn group flex flex-col items-start text-left p-3 rounded-lg bg-white text-black shadow-md"
//           style={{ '--color': '#666' }}
//         >
//           {/* <span className="material-symbols-outlined text-xl mb-2">table_view</span>
//           <span className="font-semibold text-sm text-foreground-light">
//           </span> */}
//         </motion.button>
//       ))}

//       {/* Single column selectors */}
//       {columns.map((col, idx) => {
//         const isSelected = selectedColumn === col.column && selectedTable === col.table;
//         const related = isRelated(col.table);
//         const styles = getColorVars(col.table);

//         const iconMap = {
//           'Report Data': 'summarize',
//           'Reference Data': 'menu_book',
//           'String Data': 'title',
//           'Code Data': 'code',
//           'Assignee Data': 'person'
//         };

//         return (
//           <motion.button
//             key={`${col.table}-${col.column}`}
//             custom={idx}
//             initial="hidden"
//             animate="visible"
//             variants={columnVariants}
//             onClick={() => onSelect(col.column, col.table)}
//             data-table={col.table}
//             data-column={col.column}
//             className={`column-btn group flex flex-col items-start text-left p-3 rounded-lg shadow-md transition-all ${
//               isSelected ? 'selected' : 'bg-dark'
//             } ${related ? 'related' : ''}`}
//             style={styles}
          
//           >
//             {/* <span className="material-symbols-outlined text-xl mb-2">
//               {iconMap[col.table] || 'table_chart'}
//             </span> */}
//             <span
//               className={`font-semibold text-xs ${
//                 isSelected ? '' : 'text-foreground-dark '
            
//               }`}
             
//             >
//               {col.column.replace(/_/g, ' ')}
//             </span>
//           </motion.button>
//         );
//       })}
//     </div>
//   );
// }

