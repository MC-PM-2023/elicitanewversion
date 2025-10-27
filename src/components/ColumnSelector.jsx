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
      id="columnselector"
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

