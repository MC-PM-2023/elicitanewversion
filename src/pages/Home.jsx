
import React, { useState } from 'react';
import ColumnSelector from '../components/ColumnSelector';
import Modal from '../components/Modal';
import ResultsTable from '../components/ResultsTable';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useColumns from '../hooks/useColumns';
import useSearch from '../hooks/useSearch';
import '../App.css'

const colorMap = {
  'Assignee_Table': 'purple',
  'IPC_CPC_Code': 'indigo',
  'Reference_Table': 'teal',
  'Report_Data': 'amber',
  'Strings': 'lime'
};

export default function Home() {
  const { columns, multiColumns, loading: loadingColumns, error: columnError } = useColumns();
  const { results, loading: loadingSearch, error: searchError, search } = useSearch();

  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalColumn, setModalColumn] = useState(null);

  const handleColumnSelect = (column, table) => {
    setSelectedColumn(column);
    setSelectedTable(table);
  };

  const handleSearch = () => {
    search(selectedTable, selectedColumn, searchTerm);
  };

  return (
 
      <div className="p-8 max-w-7xl mx-auto bg-white rounded-2xl mt-3">
        <ColumnSelector
          columns={columns}
          multiColumns={multiColumns}
          onSelect={handleColumnSelect}
          openModal={setModalColumn}
          selectedColumn={selectedColumn}
          selectedTable={selectedTable}
        />

        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="text-gray-600 text-xs font-medium">
            {selectedColumn && selectedTable ? (
              <span
                className={`bg-${colorMap[selectedTable] || 'gray'}-200 text-${colorMap[selectedTable] || 'gray'}-800 px-3 py-1 rounded-full block text-center md:inline`}
              >
                {selectedTable} &gt; {selectedColumn}
              </span>
            ) : (
              <span className="block text-center md:text-left">
                {/* Waiting for column selection */}
              </span>
            )}
          </div>

          <div className="w-full md:w-[500px] relative">
            {/* <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            /> */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-8 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg> */}
          </div>
        </div>

        {loadingColumns || loadingSearch ? (
          <div className="flex justify-center">
            <div className="loader border-4 border-t-4 border-purple-500 rounded-full w-6 h-6 animate-spin"></div>
          </div>
        ) : (
          <ResultsTable results={results} />
        )}

        {(columnError || searchError) && (
          <p className="text-red-500 text-center mt-4">{columnError || searchError}</p>
        )}

        {modalColumn && (
          <Modal
            column={modalColumn}
            tables={multiColumns[modalColumn]}
            onSelect={(colObj) => {
              handleColumnSelect(colObj.column, colObj.table);
              setModalColumn(null);
            }}
            onClose={() => setModalColumn(null)}
          />
        )}
      </div>

   
    
  );
}