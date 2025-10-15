
import React, { useState } from 'react';
import ColumnSelector from '../components/ColumnSelector';
import Modal from '../components/Modal';
import ResultsTable from '../components/ResultsTable';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useColumns from '../hooks/useColumns';
import useSearch from '../hooks/useSearch';
import { CirclePlus } from 'lucide-react';
import { motion,AnimatePresence, color } from 'framer-motion';
import '../App.css'
import { useAddAssignee } from '../hooks/useAddassignee';

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
  const{datas,error,loading,saveAddassignee,success}=useAddAssignee()

  let permissions = {};
  try {
    const stored = localStorage.getItem("permissions");
    if (stored) {
      const parsed = JSON.parse(stored);
      permissions = {
        addAssignee: Boolean(parsed.addAssignee),
        editAssignee: Boolean(parsed.editAssignee),
        manageRoles: Boolean(parsed.manageRoles),
        viewData: Boolean(parsed.viewData),
      };
    }
  } catch (e) {
    console.error("Failed to parse permissions:", e);
   

    permissions = {};
    console.log("Permissions:", permissions);
  }
  
  


  const [formData,setFormData]=useState({assigneename:"",productcategory:"",assigneeurl:""})
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalColumn, setModalColumn] = useState(null);
  const[addModal,setAddModal]=useState(false)
  const handleColumnSelect = (column, table) => {
    setSelectedColumn(column);
    setSelectedTable(table);
  };

  const handleSearch = () => {
    search(selectedTable, selectedColumn, searchTerm);
  };

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
 <div>
    <Header />

      <div className="p-8 max-w-7xl mx-auto bg-white rounded-2xl ">
      
        <ColumnSelector
        colorMap={colorMap}
          columns={columns}
          multiColumns={multiColumns}
          onSelect={handleColumnSelect}
          openModal={setModalColumn}
          selectedColumn={selectedColumn}
          selectedTable={selectedTable}
        />

        {/* <div className="bg-white p-5 mb-8 flex flex-col md:flex-row items-stretch justify-between md:items-center gap-2  border border-gray-200 rounded-xl shadow-md "> 
          
          <div className="text-gray-600 text-xs font-medium">
            {selectedColumn && selectedTable ? (
              <span
                className={`bg-${colorMap[selectedTable] || 'gray'}-200 text-${colorMap[selectedTable] || 'gray'}-800 px-3 py-1 rounded-full block text-center md:inline`}
              >
                {selectedTable} &gt; {selectedColumn}
              </span>
            ) : (
              <span className="block text-center md:text-left">
                {/* Waiting for column selection *
              </span>
            )}
          </div>

          <div className="w-full md:w-[300px] relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              // className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border border-2 ${colorMap[selectedTable] ? `border-${colorMap[selectedTable]}-500` : 'border-gray-300'} focus:outline-none focus:ring-0 focus:border-${colorMap[selectedTable] || 'purple'}-500 text-gray-700`}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />


      
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-8 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            
          </div>

    


  <button className="flex items-center  justify-end gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all" onClick={()=>setAddModal(!addModal)}>
    Add Assignee <CirclePlus size={16}  /> 
  </button>



<AnimatePresence>
  {addModal && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Add Assignee</h2>
          <button
            onClick={() => setAddModal(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        <input
          type="text"
          placeholder="Assignee Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          placeholder="Product Category"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          placeholder="Assignee URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setAddModal(false)}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600">
            Submit
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>





        
        </div> */}


<div className="bg-white p-5 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-gray-200 rounded-xl shadow-md">
  {/* Left: Label + Search */}
  <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
    {/* Label */}
    <div className="text-gray-600 text-xs font-medium">
      {selectedColumn && selectedTable ? (
        <span
          className={`bg-${colorMap[selectedTable] || 'gray'}-200 text-${colorMap[selectedTable] || 'gray'}-800 px-3 py-1 rounded-full block text-center md:inline`}
        >
          {selectedTable} &gt; {selectedColumn}
        </span>
      ) : (
        <span className="block text-center md:text-left"> {/* Empty state */} </span>
      )}
    </div>

    {/* Search Input */}
    <div className="relative w-full md:w-[300px]">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className={`w-full pl-10 pr-4 py-2 rounded-lg border-2 ${
          colorMap[selectedTable]
            ? `border-${colorMap[selectedTable]}-500`
            : 'border-gray-300'
        } focus:outline-none focus:ring-0 focus:border-${
          colorMap[selectedTable] || 'purple'
        }-500 text-gray-700`}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
    
    <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-8 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

    </div>
  </div>

  {/* Right: Add Assignee Button */}
  {/* <div className="flex justify-end">
    <button
      className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all"
      onClick={() => setAddModal(!addModal)}
    >
      Add Assignee <CirclePlus size={16} />
    </button>
  </div>
</div> */}

<div className='flex justify-end'>
{permissions.addAssignee && (
    <button
      className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all"
      onClick={() => setAddModal(!addModal)}
    >
      Add Assignee <CirclePlus size={16} />
    </button>
  )}
  </div>
  </div>

{/* Modal (outside of the above row layout) */}
<AnimatePresence>

{permissions.addAssignee && addModal && (  
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
  <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Add Assignee</h2>

     

          <button
            onClick={() => setAddModal(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
     
        </div>

        {error && (
          <div className="text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mb-4 text-xs">
            {error}
          </div>
        )}

{success && (
          <div className="text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mb-4 text-xs">
            {success}
          </div>
        )}

        <input
          type="text"
          placeholder="Assignee Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.assigneename}
          onChange={(e)=>setFormData({...formData,assigneename:e.target.value})}
        />
        <input
          type="text"
          placeholder="Product Category"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.productcategory}
          onChange={(e)=>setFormData({...formData,productcategory:e.target.value})}
        />
        <input
          type="text"
          placeholder="Assignee URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.assigneeurl}
          onChange={(e)=>setFormData({...formData,assigneeurl:e.target.value})}
        />

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setAddModal(false)}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm text-white  bg-indigo-500 hover:bg-indigo-600 rounded-md " onClick={()=>saveAddassignee(formData)}>
            Add
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


        {loadingColumns || loadingSearch ? (
          <div className="flex justify-center">
            <div className="loader border-4 border-t-4 border-purple-500 rounded-full w-6 h-6 animate-spin"></div>

          </div>
        ) : (
          <ResultsTable results={results} addModal={addModal} setAddModal={setAddModal} />
        )}

        {(columnError || searchError) && (
          <p className="text-red-500 text-center mt-4">{columnError || searchError}</p>
        )}

        {modalColumn && (
          <Modal
            column={modalColumn}
            colorMap={colorMap}
            tables={multiColumns[modalColumn]}
            onSelect={(colObj) => {
              handleColumnSelect(colObj.column, colObj.table);
              setModalColumn(null);
            }}
            onClose={() => setModalColumn(null)}
          />
        )}
      </div>
      </div>
   
    
  );
}