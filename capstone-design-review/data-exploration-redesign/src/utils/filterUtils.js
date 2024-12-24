export const filterPapers = (papers, filters) => {
  return papers.filter(paper => {
    // Filter by author
    if (filters.authorSearch && filters.authorSearch.trim()) {
      const searchTerm = filters.authorSearch.toLowerCase().trim();
      const authorMatches = paper.authors.some(author => 
        author.toLowerCase().includes(searchTerm)
      );
      if (!authorMatches) return false;
    }

    // Filter by year range
    if (filters.yearStart && filters.yearEnd) {
      const yearStart = parseInt(filters.yearStart);
      const yearEnd = parseInt(filters.yearEnd);
      if (paper.year < yearStart || paper.year > yearEnd) {
        return false;
      }
    }

    // Filter by minimum citations
    if (filters.minCitations) {
      const minCitations = parseInt(filters.minCitations);
      if (paper.n_citation < minCitations) {
        return false;
      }
    }

    return true;
  });
};

export const hasActiveFilters = (filters) => {
  return Object.values(filters).some(value => value !== '');
};

export const exportToJson = (data) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'papers.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};