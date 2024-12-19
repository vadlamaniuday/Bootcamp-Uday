// handleFilter.js
export function applyFilters(
  papers,
  titleFilter,
  minCitations,
  startYear,
  endYear
) {
  return papers.filter((paper) => {
    const titleMatch = titleFilter.value.toLowerCase()
      ? paper.title.toLowerCase().includes(titleFilter.value.toLowerCase())
      : true;

    const citationMatch = minCitations.value
      ? paper.n_citation >= parseInt(minCitations.value, 10)
      : true;

    const yearMatch =
      (!startYear.value || paper.year >= parseInt(startYear.value, 10)) &&
      (!endYear.value || paper.year <= parseInt(endYear.value, 10));

    return titleMatch && citationMatch && yearMatch;
  });
}

export function clearFilters(titleFilter, minCitations, startYear, endYear) {
  titleFilter.value = "";
  minCitations.value = "";
  startYear.value = "";
  endYear.value = "";
}
