

import React from 'react';
import { motion } from 'framer-motion';

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

export default function ResultsTable({ results }) {
  if (!results || results.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-500 text-xs"
      >
        Search results will appear here.
      </motion.p>
    );
  }

  const headers = Object.keys(results[0]);

  return (
    <motion.div
      className="overflow-x-auto"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.table
        className="min-w-full divide-y divide-gray-200 rounded-lg shadow-sm overflow-hidden"
        layout
      >
        <thead className="bg-gray-200">
          <tr>
            {headers.map((h, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((row, rIdx) => (
            <motion.tr
              key={rIdx}
              variants={rowVariants}
              custom={rIdx}
              initial="hidden"
              animate="visible"
              className="hover:bg-gray-50 transition-colors"
            >
              {headers.map((h, cIdx) => (
                <td
                  key={cIdx}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {row[h]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
