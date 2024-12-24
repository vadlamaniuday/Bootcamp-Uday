import { useState, useEffect } from 'react';
import { parseAuthors } from '../utils/parseUtils';

export const useLoadData = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        const data = await response.json();
        // Parse the data with proper Unicode handling
        const parsedData = data.map(paper => ({
          ...paper,
          authors: parseAuthors(paper.authors)
        }));
        setPapers(parsedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { papers, loading, error };
};