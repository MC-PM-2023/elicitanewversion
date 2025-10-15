import { useEffect, useState } from 'react';
import { fetchAllColumns } from '../api/columnApi/columnApi';
const colorMap = {
  'Assignee_Table': 'purple',
  'IPC_CPC_Code': 'indigo',
  'Reference_Table': 'teal',
  'Report_Data': 'amber',
  'Strings': 'lime'
};

const useColumns = () => {
  const [columns, setColumns] = useState([]);
  const [multiColumns, setMultiColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadColumns = async () => {
      try {
        const data = await fetchAllColumns();

        const tables = data.data[0];
        const temp = [];
        const multi = {};

        // for (let table in tables) {
        //   for (let column of tables[table]) {
        //     temp.push({
        //       table,
        //       column,
        //       color: colorMap[table] || 'gray'
        //     });
        //   }
        // }

        for (let table in tables) {
          const columnsInTable = tables[table];
          // console.log(columnsInTable)
        
          // ✅ Check it's an array or convert if it's an object
          if (Array.isArray(columnsInTable)) {
            for (let column of columnsInTable) {
              temp.push({
                table,
                column,
                color: colorMap[table] || 'gray'
              });
            }
          } else if (columnsInTable && typeof columnsInTable === 'object') {
            // If it's an object, loop through keys
            for (let column in columnsInTable) {
              temp.push({
                table,
                column,
                color: colorMap[table] || 'gray'
              });
            }
          }
        }
        
        const counts = temp.reduce((acc, col) => {
          acc[col.column] = (acc[col.column] || 0) + 1;
          return acc;
        }, {});

        const singles = temp.filter(col => counts[col.column] === 1);
        temp.forEach(col => {
          if (counts[col.column] > 1) {
            if (!multi[col.column]) multi[col.column] = [];
            multi[col.column].push(col);
          }
        });
// console.log("Single columns:",singles)
        setColumns(singles);
        // console.log("Multiple columns:",multi)
        setMultiColumns(multi);
      } catch (err) {
        // console.error(err);
        setError('Failed to fetch columns');
      } finally {
        setLoading(false);
      }
    };

    loadColumns();
  }, []);

  return { columns, multiColumns, loading, error };
};

export default useColumns;
