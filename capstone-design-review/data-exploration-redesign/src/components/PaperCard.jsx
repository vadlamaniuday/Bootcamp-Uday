import React from 'react';

function PaperCard({ paper }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h2 className="text-xl font-bold mb-4">{paper.title}</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Authors:</h3>
        <p>{paper.authors.join(', ')}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Year:</h3>
        <p>{paper.year}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Citations:</h3>
        <p>{paper.n_citation}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Abstract:</h3>
        <p className="text-gray-700">{paper.abstract}</p>
      </div>
      <div>
        <h3 className="font-semibold">Venue:</h3>
        <p>{paper.venue}</p>
      </div>
    </div>
  );
}

export default PaperCard;