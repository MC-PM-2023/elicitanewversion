import { useState } from 'react';
import { searchData } from '../api/searchApi/searchApi';
const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (table, column, query) => {
    if (!table || !column || query.trim() === '') {
      setError('Select a column and enter a term.');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const data = await searchData({ table, column, query });

      if (data.success) {
        setResults(data.results);
      } else {
        setError(data.message || 'Search failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return { results,setResults, loading, error, search };
};

export default useSearch;
