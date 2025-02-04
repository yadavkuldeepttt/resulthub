// pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ResultsGrid } from '../components/dashboard/ResultsGrid';
import { Layout } from '../components/layout/Layout';
import { fetchResults } from '../services/api';

export const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setLoading(true);
      const data = await fetchResults();
      setResults(data);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Live Results
        </h1>
        <button 
          onClick={loadResults}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Refresh <ChevronRight size={16} className="ml-2" />
        </button>
      </div>
      <ResultsGrid results={results} loading={loading} />
    </Layout>
  );
};