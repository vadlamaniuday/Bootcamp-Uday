import { useState } from 'react';
import SearchFilters from './components/SearchFilters';
import PaperCard from './components/PaperCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';
import PageSizeSelector from './components/PageSizeSelector';
import { filterPapers, exportToJson, hasActiveFilters } from './utils/filterUtils';
import { getPaginatedData, getTotalPages } from './utils/paginationUtils';
import { useLoadData } from './hooks/useLoadData';

function App() {
  const { papers, loading, error } = useLoadData();
  const [filters, setFilters] = useState({
    authorSearch: '',
    yearStart: '',
    yearEnd: '',
    minCitations: ''
  });
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleApplyFilters = () => {
    const filtered = filterPapers(papers, filters);
    setFilteredPapers(filtered);
    setFiltersApplied(true);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      authorSearch: '',
      yearStart: '',
      yearEnd: '',
      minCitations: ''
    });
    setFilteredPapers([]);
    setFiltersApplied(false);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const displayedPapers = filtersApplied ? filteredPapers : papers;
  const totalPages = getTotalPages(displayedPapers.length, pageSize);
  const paginatedPapers = getPaginatedData(displayedPapers, currentPage, pageSize);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Paper Data Filter</h1>
          <button
            onClick={() => exportToJson(displayedPapers)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Export Data
          </button>
        </div>

        <SearchFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters(filters)}
        />

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
            <div>
              Showing {paginatedPapers.length} of {displayedPapers.length} papers
              {filtersApplied && ' (filtered)'}
            </div>
            <PageSizeSelector 
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>

          {paginatedPapers.map(paper => (
            <PaperCard key={paper.id} paper={paper} />
          ))}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;