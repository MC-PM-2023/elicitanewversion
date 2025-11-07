// //updated color code
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function Modal({ column, tables, onSelect, onClose }) {
//   // Define color mapping for each table
//   const colorMap = {
//     Assignee_Table: 'purple',
//     IPC_CPC_Code: 'indigo',
//     Reference_Table: 'teal',
//     Report_Data: 'amber',
//     Strings: 'lime'
//   };

//   // Optional fallback color
//   const getColorClasses = (tableName) => {
//     const color = colorMap[tableName] || 'gray';
//     return {
//       bg: `bg-${color}-50`,
//       border: `border-${color}-400`,
//       hoverBg: `hover:bg-${color}-100`,
//       hoverBorder: `hover:border-${color}-500`,
//       text: `text-${color}-800`
//     };
//   };


//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0  flex items-center justify-center bg-black/40 backdrop-blur-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 40, opacity: 0 }}
//           transition={{ type: 'spring', damping: 20, stiffness: 300 }}
//         >
//           {/* Close Button */}
//           <button
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
//             onClick={onClose}
//             aria-label="Close"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
            
//             </svg>
//           </button>

//           {/* Modal Title */}
//           <h2 className="text-sm font-semibold text-gray-800 text-center mb-6">
//             Select Table for{' '}
//             <span className="font-mono text-purple-600 text-xl">
//               '{column.replace(/_/g, ' ')}'
//             </span>
//           </h2>

//           {/* Table Options */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             {tables.map((colObj, idx) => {
//               const colorClasses = getColorClasses(colObj.table);
//               return (
//                 <button
//                   key={idx}
//                   className={`w-full text-left px-4 py-3 rounded-lg border transition-colors text-xs font-medium
//                      ${colorClasses.border} ${colorClasses.text}
//                    ${colorClasses.hoverBorder}
//                   `}
//                   onClick={() => onSelect(colObj)}
//                 >
//                   {colObj.table
//                     .replace(/_Table$/, '')
//                     .replace('data', ' Data')
//                     .replace(/_/g, ' ')}
//                 </button>
//               );
//             })}
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }



import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ column, tables, onSelect, onClose }) {
  // Define color mapping for each table
  const colorMap = {
    Assignee_Table: 'purple',
    IPC_CPC_Code: 'indigo',
    Reference_Table: 'teal',
    Report_Data: 'amber',
    Strings: 'lime'
  };

  // Optional fallback color
  const getColorClasses = (tableName) => {
    const color = colorMap[tableName] || 'gray';
    return {
      bg: `bg-${color}-50`,
      border: `border-${color}-400`,
      hoverBg: `hover:bg-${color}-100`,
      hoverBorder: `hover:border-${color}-500`,
      text: `text-${color}-800`
    };
  };

  // State to store current scroll position
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ pointerEvents: 'auto' }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative mx-auto"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{ marginTop: scrollY + 100}} // modal appears relative to scroll
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal Title */}
          <h2 className="text-sm font-semibold text-gray-800 text-center mb-6">
            Select Table for{' '}
            <span className="font-mono text-purple-600 text-xl">
              '{column.replace(/_/g, ' ')}'
            </span>
          </h2>

          {/* Table Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tables.map((colObj, idx) => {
              const colorClasses = getColorClasses(colObj.table);
              return (
                <button
                  key={idx}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors text-xs font-medium
                     ${colorClasses.border} ${colorClasses.text} ${colorClasses.hoverBorder}`}
                  onClick={() => onSelect(colObj)}
                >
                  {colObj.table
                    .replace(/_Table$/, '')
                    .replace('data', ' Data')
                    .replace(/_/g, ' ')}
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
