// renderTable.js
export function renderPapers(
  papers,
  currentPage,
  rowsPerPage,
  paperList,
  pageInfo,
  prevPageButton,
  nextPageButton
) {
  console.log("Rendering papers:", papers.length);
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedPapers = papers.slice(start, end);

  paperList.innerHTML = "";
  paginatedPapers.forEach((paper, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    let authors = parseAuthors(paper.authors);

    let truncatedAbstract = "";
    if (paper.abstract) {
      truncatedAbstract =
        paper.abstract.split(" ").slice(0, 75).join(" ") + "...";
    }

    card.innerHTML = `
        <h3>${paper.title || "No Title"}</h3>
        <div class="details">
          <div class="authors-year">
            <p>Authors: ${authors.join(", ") || "No Authors"}</p>
            <p>Year: ${paper.year || "No Year"}</p>
          </div>
          <div class="venue-citations">
            <p>Venue: ${paper.venue || "No Venue"}</p>
            <p>Citations: ${paper.n_citation || "No Citations"}</p>
          </div>
        </div>
        <p class="abstract">${truncatedAbstract || "No Abstract"} ${
      paper.abstract ? '<a href="#" class="read-more">Read More</a>' : ""
    }</p>
        <p class="full-abstract" style="display:none;">${
          paper.abstract || "No Abstract"
        }</p>
      `;
    paperList.appendChild(card);

    if (paper.abstract) {
      const readMoreLink = card.querySelector(".read-more");
      readMoreLink.addEventListener("click", (event) => {
        event.preventDefault();
        const abstractElement = card.querySelector(".abstract");
        const fullAbstractElement = card.querySelector(".full-abstract");
        abstractElement.style.display = "none";
        fullAbstractElement.style.display = "block";
      });
    }
  });

  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
    papers.length / rowsPerPage
  )}`;
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled =
    currentPage === Math.ceil(papers.length / rowsPerPage);
}

function parseAuthors(authorsString) {
  if (!authorsString) return [];

  try {
    return JSON.parse(authorsString.replace(/'/g, '"'));
  } catch (e) {
    return authorsString
      .replace(/[\[\]']/g, "")
      .split(",")
      .map((author) => author.trim())
      .filter((author) => author);
  }
}
