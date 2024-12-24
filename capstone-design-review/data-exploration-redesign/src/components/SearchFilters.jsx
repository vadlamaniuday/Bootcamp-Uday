import React from 'react';

function SearchFilters({ filters, onFilterChange, onApplyFilters, onClearFilters, hasActiveFilters }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Authors
          </label>
          <input
            type="text"
            value={filters.authorSearch}
            onChange={(e) => onFilterChange('authorSearch', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter author name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Citations
          </label>
          <input
            type="number"
            value={filters.minCitations}
            onChange={(e) => onFilterChange('minCitations', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter minimum citations"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Start
          </label>
          <input
            type="number"
            value={filters.yearStart}
            onChange={(e) => onFilterChange('yearStart', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Start year"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year End
          </label>
          <input
            type="number"
            value={filters.yearEnd}
            onChange={(e) => onFilterChange('yearEnd', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="End year"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onApplyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchFilters;