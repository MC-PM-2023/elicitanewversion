


import React from 'react';
import { motion } from 'framer-motion';

export default function ColumnSelector({
  columns,
  multiColumns,
  onSelect,
  openModal,
  selectedColumn,
  selectedTable
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
        damping: 12
      }
    })
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
      {/* Multi-columns that open modal */}
      {Object.keys(multiColumns).map((colName, idx) => (
        <motion.div
          key={colName}
          custom={idx}
          initial="hidden"
          animate="visible"
          variants={columnVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => openModal(colName)}
          className="cursor-pointer bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center space-y-2 text-gray-600 border border-gray-200 transition-all hover:shadow-lg text-xs"
        >
          <span className="font-medium">{colName.replace(/_/g, ' ')}</span>
          {/* <span className="text-xs text-purple-500">Select table</span> */}
        </motion.div>
      ))}

      {/* Directly selectable columns */}
      {columns.map((col, idx) => {
        const isSelected =
          selectedColumn === col.column && selectedTable === col.table;
        return (
          <motion.div
            key={`${col.table}-${col.column}`}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={columnVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(col.column, col.table)}
            className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 border transition-all ${
              isSelected
                ? 'bg-purple-100 border-purple-500 text-purple-800 shadow-lg'
                : 'bg-white border-gray-200 text-gray-600 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="font-medium text-xs">
              {col.column.replace(/_/g, ' ')}
            </span>
            {/* <span className="text-xs text-gray-400">{col.table.replace(/_/g, ' ')}</span> */}
          </motion.div>
        );
      })}
    </div>
  );
}
