export function handleFilter(
  data,
  titleFilter,
  minCitations,
  startYear,
  endYear
) {
  return data.filter((item) => {
    const titleMatch = titleFilter.value.toLowerCase()
      ? item.title.toLowerCase().includes(titleFilter.value.toLowerCase())
      : true;

    const citationMatch = minCitations.value
      ? item.n_citation >= parseInt(minCitations.value, 10)
      : true;

    const yearMatch =
      (!startYear.value || item.year >= parseInt(startYear.value, 10)) &&
      (!endYear.value || item.year <= parseInt(endYear.value, 10));

    return titleMatch && citationMatch && yearMatch;
  });
}
