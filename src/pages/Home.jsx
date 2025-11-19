// import React, { useState,useEffect } from 'react';
// import ColumnSelector from '../components/ColumnSelector';
// import Modal from '../components/Modal';
// import ResultsTable from '../components/ResultsTable';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import useColumns from '../hooks/useColumns';
// import useSearch from '../hooks/useSearch';
// import { CirclePlus, ToggleLeft } from 'lucide-react';
// import { motion,AnimatePresence, color } from 'framer-motion';
// import '../App.css'
// import { useAddAssignee } from '../hooks/useAddassignee';
// import { ArrowUp, ArrowDownNarrowWide ,ToggleRight} from "lucide-react"; // icons



// const colorMap = {
//   'Assignee_Table': 'purple',
//   'IPC_CPC_Code': 'indigo',
//   'Reference_Table': 'teal',
//   'Report_Data': 'amber',
//   'Strings': 'lime'
// };

// export default function Home() {
//   const { columns, multiColumns, loading: loadingColumns, error: columnError } = useColumns();
//   const { results,setResults, loading: loadingSearch, error: searchError, search } = useSearch();
//   const{datas,error,loading,saveAddassignee,success}=useAddAssignee()
//   const [showScrollIcons, setShowScrollIcons] = useState(false);
//   const [filterTerm, setFilterTerm] = useState('');


// // Show icons only when the user scrolls down
// useEffect(() => {
//   const handleScroll = () => {
//     if (window.scrollY > 200) {
//       setShowScrollIcons(true);
//     } else {
//       setShowScrollIcons(false);
//     }
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);


// // Scroll to top of the page
// const scrollToTop = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

// // Scroll to selected column (cell by ID)
// const scrollToSelectedColumn = () => {
//   if (!selectedColumn) return;

//   // Example: ID is based on column name
//   const element = document.getElementById(`column-${selectedColumn}`);

//   if (element) {
//     element.scrollIntoView({ behavior: "smooth", block: "center" });
//   } else {
//     alert(`No element found for ${selectedColumn}`);
//   }
// };



//   let permissions = {};
  
//   try {
//     const stored = localStorage.getItem("permissions");
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       permissions = {
//         addAssignee: Boolean(parsed.addAssignee),
//         editAssignee: Boolean(parsed.editAssignee),
//         manageRoles: Boolean(parsed.manageRoles),
//         viewData: Boolean(parsed.viewData),
//       };
//     }
//   } catch (e) {
//     console.error("Failed to parse permissions:", e);
//     permissions = {};
//     console.log("Permissions:", permissions);
//   }
  


//   const [formData,setFormData]=useState({assigneename:"",productcategory:"",assigneeurl:""})
//   const [selectedColumn, setSelectedColumn] = useState(null);
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalColumn, setModalColumn] = useState(null);
//   const[addModal,setAddModal]=useState(false)
//   const [showError, setShowError] = useState(false);
//   const [exactMatch, setExactMatch] = useState(false);


//   const handleColumnSelect = (column, table) => {
//     setSelectedColumn(column);
//     setSelectedTable(table);
//     setResults([])
//     setSearchTerm("")
//     setFilterTerm("")
//   };


//   const handleSearch = () => {

//     search(selectedTable, selectedColumn, searchTerm);
//   };

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
//     <div className=''>
// {showScrollIcons && (
//   <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
//     {/* Scroll to Top */}
//     <button
//       onClick={scrollToTop}
//       className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all mb-3"
//       title="Scroll to top"
//     >
//       <ArrowUp size={15} />
//     </button>

//     {/* Scroll to Selected Column */}
//     {/* <a
//       href='#columnselector'
//       className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all"
//       title="Go Back to Column"
      
//     >
//      <Columns2 size={20}/>
//     </a> */}



//   </div>
// )}

// <Header />
//  <div className='names '>
   

//       <div className="p-8 max-w-7xl mx-auto bg-white rounded-2xl glassmorphism ">
     
     
//       <div className="sticky top-18 z-40 bg-white p-2 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-gray-200 rounded-xl shadow-md backdrop-blur-sm bg-opacity-95">

//   {/* Right: Add Assignee Button */}
//   {/* <div className="flex justify-end">
//     <button
//       className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all"
//       onClick={() => setAddModal(!addModal)}
//     >
//       Add Assignee <CirclePlus size={16} />
//     </button>
//   </div>
// </div> */}

// <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-1">

//   {/* LEFT SIDE — Selected Table > Column + Search Input */}
//   <div className="flex flex-col md:flex-row items-center gap-3 text-xs  text-gray-600 font-semibold">
//     {selectedColumn && selectedTable ? (
//       <span
//         className={`bg-${colorMap[selectedTable] || 'gray'}-200 text-${colorMap[selectedTable] || 'gray'}-800 px-3 py-1 rounded-full `}
//       >
//         {selectedTable} &gt; {selectedColumn}
//       </span>
//     ) : (
//       <span className="text-gray-400"></span>
//     )}

//     {/* Search Input */}
//     <div className="relative w-full md:w-[250px]">
//   {/* Search input */}
//   <input
//     type="text"
//     value={searchTerm}
//     placeholder={selectedColumn ? `Search ${selectedColumn}` : "Search term"}
//     className={`pl-8 pr-10 py-2 px-3 w-full rounded-lg text-sm border-2 ${
//       colorMap[selectedTable]
//         ? `border-${colorMap[selectedTable]}-500`
//         : "border-gray-300"
//     } focus:outline-none focus:ring-0 focus:border-${
//       colorMap[selectedTable] || "purple"
//     }-500 text-gray-700`}
//     onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//     onFocus={() => setShowError(true)}
//     onChange={(e) => {
//       setSearchTerm(e.target.value);
//       if (e.target.value.trim() !== "") setShowError(false);
//     }}
//   />

//   {/* 🔍 Search Icon */}
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="absolute left-3 top-7 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//     />
//   </svg>
  
//   {/* ✅ Result Count inside input */}

//   {searchTerm && (
//     <button
//       onClick={() => {
//         setSearchTerm("");
//         setResults([]); // ✅ Clears the previous results
//       }}
//       className="absolute right-15 top-7 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//       title="Clear search"
//     >
//       &times;
//     </button>
//   )}
  

//   {results.length > 0 && (
//     <span className="absolute right-3 top-8 -translate-y-1/2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
//       {results.length}
//     </span>
//   )}

//   {/* Error message */}
//   {showError && (
//     <span className="block text-red-500 text-xs mt-1 text-center md:text-left">
//       {columnError || searchError}
//     </span>
//   )}
  
// </div>
// {/* <ToggleRight
//     size={40}
//     className={`cursor-pointer transition-transform duration-200 ${
//       exactMatch ? "text-blue-600 rotate-180" : "text-gray-500"
//     }`}
//     title={exactMatch ? "Exact Match (ON)" : "Partial Match (OFF)"}
//     onClick={() => setExactMatch((prev) => !prev)}
//   /> */}
//    {exactMatch ? (
//       <ToggleRight
//         size={25}
//         className="cursor-pointer text-blue-600 transition-transform duration-200 rotate-180"
//         title="Exact Match (ON)"
//         onClick={() => setExactMatch(false)}
//       />
//     ) : (
//       <ToggleLeft
//         size={25}
//         className="cursor-pointer text-gray-500 transition-transform duration-200"
//         title="Partial Match (OFF)"
//         onClick={() => setExactMatch(true)}
//       />
//     )}
//   <p className="text-xs text-gray-500 ml-1">
//   {exactMatch ? "Exact match enabled" : ""}
// </p>
//   </div>

//   {/* RIGHT SIDE — Results + Filter input */}
//   <div className="flex items-center gap-3">
//     {/* Results count */}
//  {/* {results.length>0 &&  
//  <span className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-300">
//       Results
//       {results.length > 0 && (
//         <span className="ml-2 bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">
//           {results.length ||0}
//         </span>
//       )}
//     </span>
// } */}

//     {/* Result filter input */}
//     <input
//   type="text"
//   placeholder="Type to Filter..."
//   className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 "
//   value={filterTerm}
//   onChange={(e) => setFilterTerm(e.target.value)}
// />

// {results.length > 0 && filterTerm && (
//     <span className="absolute right-7 top-10  -translate-y-1/2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300">
//       {
//         results.filter((item) => {
//           // Adjust this depending on your result object structure
//           const value = typeof item === "string" ? item : item[selectedColumn] || "";
//           if (exactMatch) {
//             return value === filterTerm;
//           } else {
//             return value.toLowerCase().includes(filterTerm.toLowerCase());
//           }
//         }).length
//       }
//     </span>
//   )}



// {/* <ArrowDownNarrowWide size={20} className='cursor-pointer' title="Exact Match Filter"/> */}

//   </div>
// </div>


// <div className='flex justify-end'  id="columnselector">
// {permissions.addAssignee && (
//     <button
//       className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all"
//       onClick={() => setAddModal(!addModal)}
//     >
//       Add Assignee <CirclePlus size={16} />
//     </button>
//   )}
//   </div>
//   </div>
//   <ColumnSelector
//         colorMap={colorMap}
//           columns={columns}
//           multiColumns={multiColumns}
//           onSelect={handleColumnSelect}
//           openModal={setModalColumn}
//           selectedColumn={selectedColumn}
//           selectedTable={selectedTable}
          
//         />


// {/* Modal (outside of the above row layout) */}
// <AnimatePresence>

// {permissions.addAssignee && addModal && (  
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4"
//         initial={{ opacity: 0, scale: 0.9, y: -20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: -20 }}
//         transition={{ duration: 0.2, ease: 'easeInOut' }}
//       >
//   <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-700">Add Assignee</h2>

     

//           <button
//             onClick={() => setAddModal(false)}
//             className="text-gray-500 hover:text-gray-700 text-xl"
//           >
//             &times;
//           </button>
     
//         </div>

//         {error && (
//           <div className="text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mb-4 text-xs">
//             {error}
//           </div>
//         )}

// {success && (
//           <div className="text-red-600 bg-red-100 border border-red-400 rounded-md p-2 mb-4 text-xs">
//             {success}
//           </div>
//         )}

//         <input
//           type="text"
//           placeholder="Assignee Name"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           value={formData.assigneename}
//           onChange={(e)=>setFormData({...formData,assigneename:e.target.value})}
//         />
//         <input
//           type="text"
//           placeholder="Product Category"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           value={formData.productcategory}
//           onChange={(e)=>setFormData({...formData,productcategory:e.target.value})}
//         />
//         <input
//           type="text"
//           placeholder="Assignee URL"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           value={formData.assigneeurl}
//           onChange={(e)=>setFormData({...formData,assigneeurl:e.target.value})}
//         />

//         <div className="flex justify-end gap-2 pt-4">
//           <button
//             onClick={() => setAddModal(false)}
//             className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button className="px-4 py-2 text-sm text-white  bg-indigo-500 hover:bg-indigo-600 rounded-md " onClick={()=>saveAddassignee(formData)}>
//             Add
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   )}
// </AnimatePresence>


//         {loadingColumns || loadingSearch ? (
//           <div className="flex justify-center">
//             <div className="loader border-4 border-t-4 border-purple-500 rounded-full w-6 h-6 animate-spin"></div>

//           </div>
//         ) : (
//           <ResultsTable results={results} addModal={addModal} setAddModal={setAddModal} selectedColumn={selectedColumn} selectedTable={selectedTable} searchTerm={searchTerm}   filterTerm={filterTerm} exactMatch={exactMatch}  />
//         )}

      

//         {modalColumn && (
//           <Modal
//             column={modalColumn}
//             colorMap={colorMap}
//             tables={multiColumns[modalColumn]}
//             onSelect={(colObj) => {
//               handleColumnSelect(colObj.column, colObj.table);
//               setModalColumn(null);
//             }}
//             onClose={() => setModalColumn(null)}
//           />
//         )}
//       </div>
//       {/* <Footer/> */}
//       <Footer/>
//       </div>
//       </div>
   
    
//   );
// }



import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlus, ToggleLeft, ToggleRight, ArrowUp } from "lucide-react";
import "../App.css";
import switchon from '../assets/icons/switch-on.png';
import switchoff from '../assets/icons/switch-off.png'
import Header from "../components/Header";
import Footer from "../components/Footer";
import useColumns from "../hooks/useColumns";
import useSearch from "../hooks/useSearch";
import { useAddAssignee } from "../hooks/useAddassignee";

// ✅ Lazy load large components to improve initial performance
const ColumnSelector = React.lazy(() => import("../components/ColumnSelector"));
const ResultsTable = React.lazy(() => import("../components/ResultsTable"));
const Modal = React.lazy(() => import("../components/Modal"));

export default function Home() {
  const { columns, multiColumns, loading: loadingColumns, error: columnError } =
    useColumns();
  const {
    results,
    setResults,
    loading: loadingSearch,
    error: searchError,
    search,
    userName
  } = useSearch();
  const { datas, error, loading, saveAddassignee, success } = useAddAssignee();

  // ---------- State ----------
  const [showScrollIcons, setShowScrollIcons] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [formData, setFormData] = useState({
    assigneename: "",
    productcategory: "",
    assigneeurl: ""
  });
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalColumn, setModalColumn] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [exactMatch, setExactMatch] = useState(false);

  // ---------- Memoized Values ----------
  const colorMap = useMemo(
    () => ({
      Assignee_Table: "purple",
      IPC_CPC_Code: "indigo",
      Reference_Table: "teal",
      Report_Data: "amber",
      Strings: "lime"
    }),
    []
  );

  // ---------- Permissions from LocalStorage ----------
  const permissions = useMemo(() => {
    try {
      const stored = localStorage.getItem("permissions");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          addAssignee: Boolean(parsed.addAssignee),
          editAssignee: Boolean(parsed.editAssignee),
          manageRoles: Boolean(parsed.manageRoles),
          viewData: Boolean(parsed.viewData)
        };
      }
    } catch (e) {
      console.error("Failed to parse permissions:", e);
    }
    return {};
  }, []);

  // ---------- Event Handlers ----------
  const handleColumnSelect = useCallback((column, table) => {
    setSelectedColumn(column);
    setSelectedTable(table);
    setResults([]);
    setSearchTerm("");
    setFilterTerm("");
   
  
  }, []);

  const handleSearch = useCallback(() => {
    search(selectedTable, selectedColumn, searchTerm);
  }, [search, selectedTable, selectedColumn, searchTerm]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIcons(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Filtered Results ----------
  // const filteredResults = useMemo(() => {
  //   if (!filterTerm) return results;
  //   return results.filter((item) => {
  //     const value =
  //       typeof item === "string" ? item : item[selectedColumn] || "";
  //     return exactMatch
  //       ? value === filterTerm
  //       : value.toLowerCase().includes(filterTerm.toLowerCase());
  //   });
  // }, [results, filterTerm, selectedColumn, exactMatch]);

  // const filteredResults = useMemo(() => {
  //   if (!results) return [];
  
  //   return results.filter((item) => {
  //     // Get the value for the selected column, default to empty string if not found
  //     const value = typeof item === "string" ? item : item[selectedColumn] || "";
  
  //     // Trim and convert to lower case for consistent comparison (both exact and partial)
  //     const normalizedValue = value.trim().toLowerCase();
  //     const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  
  //     if (!searchTerm) return true; // If no search term, show all results
  
  //     if (exactMatch) {
  //       // Exact match filtering (case insensitive and no leading/trailing spaces)
  //       return normalizedValue === normalizedSearchTerm;
  //     } else {
  //       // Partial match filtering (case insensitive)
  //       return normalizedValue.includes(normalizedSearchTerm);
  //     }
  //   });
  // }, [results, searchTerm, selectedColumn, exactMatch]);
  

  const filteredResults = useMemo(() => {
    if (!results) return [];
  
    return results
      .filter(item => {
        // Column search filter
        if (!selectedColumn) return true;
        const value = typeof item === "string" ? item : item[selectedColumn] || "";
        const normalizedValue = value.trim().toLowerCase();
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  
        if (!searchTerm) return true;
  
        return exactMatch
          ? normalizedValue === normalizedSearchTerm
          : normalizedValue.includes(normalizedSearchTerm);
      })
      .filter(item => {
        // "Type to Filter..." input filter
        if (!filterTerm) return true;
        const value = typeof item === "string" ? item : item[selectedColumn] || "";
        const normalizedValue = value.trim().toLowerCase();
        const normalizedFilterTerm = filterTerm.trim().toLowerCase();
  
        return normalizedValue.includes(normalizedFilterTerm);
      });
  }, [results, searchTerm, filterTerm, selectedColumn, exactMatch]);
  
 

  // ---------- UI ----------
  return (
    <div>
      {showScrollIcons && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <button
            onClick={scrollToTop}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all mb-3"
            title="Scroll to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      )}

      <Header />
      <div className='names '>
      <div className="p-8 max-w-7xl mx-auto bg-white rounded-2xl glassmorphism">
        {/* Sticky Header */}
        <div className="sticky top-18 z-40 bg-white p-2 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-gray-200 rounded-xl shadow-md backdrop-blur-sm bg-opacity-95">
          {/* Left Side */}
          <div className="flex flex-col md:flex-row items-center gap-3 text-xs text-gray-600 font-semibold">
            {selectedColumn && selectedTable ? (
              <span
                className={`bg-${colorMap[selectedTable] || "gray"}-200 text-${
                  colorMap[selectedTable] || "gray"
                }-800 px-3 py-1 rounded-full`}
              >
                {selectedTable} &gt; {selectedColumn}
              </span>
            ) : (
              <span className="text-gray-400"></span>
            )}

            {/* Search Input */}
            <div className="relative w-full md:w-[250px]">
              <input
                type="text"
                value={searchTerm}
                placeholder={
                  selectedColumn ? `Search ${selectedColumn}` : "Search term"
                }
                className={`pl-8 pr-10 py-2 px-3 w-full rounded-lg text-sm border-2 ${
                  colorMap[selectedTable]
                    ? `border-${colorMap[selectedTable]}-500`
                    : "border-gray-300"
                } focus:outline-none focus:ring-0 text-gray-700`}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => setShowError(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value.trim() !== "") setShowError(false);
                }}
              />

              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-7 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Clear Button */}
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setResults([]);
                  }}
                  className="absolute right-15 top-7 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Clear search"
                >
                  &times;
                </button>
              )}

              {/* Results Count */}
              {results.length > 0 && (
                <span className="absolute right-3 top-8 -translate-y-1/2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
                  {results.length}
                </span>
              )}

              {/* Error */}
              {showError && (
                <span className="block text-red-500 text-xs mt-1 text-center md:text-left">
                  {columnError || searchError}
                </span>
              )}
            </div>

            {/* Toggle Button */}
            {/* {exactMatch ? (
              <img src={switchon}
                size={25}
                className="cursor-pointer text-blue-600 transition-transform duration-200 rotate-180"
                title="Exact Match (ON)"
                onClick={() => setExactMatch(false)}
              />
            ) : (
              <img src={switchoff}
                size={25}
                className="cursor-pointer text-gray-500 transition-transform duration-200"
                title="Partial Match (OFF)"
                onClick={() => setExactMatch(true)}
              />
            )} */}
            {exactMatch ? (
  <img
    src={switchon}
    alt="Exact Match On"
    width={25}
    height={25}
    className="cursor-pointer text-blue-600 transition-transform duration-200 rotate-180"
    title="Exact Match (ON)"
    onClick={() => setExactMatch(false)}
  />
//   <img
//   src={exactMatch ? switchon : switchoff}
//   alt={exactMatch ? "Exact Match On" : "Partial Match Off"}
//   width={25}
//   height={25}
//   className="cursor-pointer transition-transform duration-200"
//   title={exactMatch ? "Exact Match (ON)" : "Partial Match (OFF)"}
//   onClick={() => setExactMatch(!exactMatch)}
// />

) : (
  <img
    src={switchoff}
    alt="Partial Match Off"
    width={25}
    height={25}
    className="cursor-pointer text-gray-500 transition-transform duration-200"
    title="Partial Match (OFF)"
    onClick={() => setExactMatch(true)}
  />
)}

            <p className="text-xs text-gray-500 ml-1">
              {exactMatch ? "Exact match enabled" : ""}
            </p>
          </div>

          {/* Right Side Filter */}
          <div className="flex items-center gap-3 relative">
            <input
              type="text"
              placeholder="Type to Filter..."
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />

            {filteredResults.length > 0 && filterTerm && (
              <span className="absolute right-4 top-8 -translate-y-1/2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300">
                {filteredResults.length}
              </span>
            )}
          </div>
        </div>

        {/* Add Assignee Button */}
        {/* {permissions.addAssignee && (
          <div className="flex justify-end" id="columnselector">
            <button
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all"
              onClick={() => setAddModal(true)}
            >
              Add Assignee <CirclePlus size={16} />
            </button>
          </div>
        )} */}

        {/* Column Selector */}
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <ColumnSelector
            colorMap={colorMap}
            columns={columns}
            multiColumns={multiColumns}
            onSelect={handleColumnSelect}
            openModal={setModalColumn}
            selectedColumn={selectedColumn}
            selectedTable={selectedTable}
          />
        </Suspense>

        {/* Add Modal */}
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
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Add Assignee
                  </h2>
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
                  <div className="text-green-600 bg-green-100 border border-green-400 rounded-md p-2 mb-4 text-xs">
                    {success}
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Assignee Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.assigneename}
                  onChange={(e) =>
                    setFormData({ ...formData, assigneename: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Product Category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.productcategory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      productcategory: e.target.value
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Assignee URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.assigneeurl}
                  onChange={(e) =>
                    setFormData({ ...formData, assigneeurl: e.target.value })
                  }
                />

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={() => setAddModal(false)}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded-md"
                    onClick={() => saveAddassignee(formData)}
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Table */}
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          {loadingColumns || loadingSearch ? (
            <div className="flex justify-center mt-2">
              <div className="loader border-4 border-t-4 border-purple-500 rounded-full w-6 h-6 animate-spin"></div>
            </div>
          ) : (
            <ResultsTable
              results={filteredResults}
              addModal={addModal}
              setAddModal={setAddModal}
              selectedColumn={selectedColumn}
              selectedTable={selectedTable}
              searchTerm={searchTerm}
              filterTerm={filterTerm}
              exactMatch={exactMatch}
            />
          )}
        </Suspense>

        {/* Column Modal */}
        {modalColumn && (
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        )}

{/* {results.length > 0 && (
  <p className="text-sm text-gray-500 mb-2">
    Search performed by: <span className="font-semibold">{userName}</span>
  </p>
)} */}

        
      </div>
</div>
      <Footer />
    </div>
  );
}
