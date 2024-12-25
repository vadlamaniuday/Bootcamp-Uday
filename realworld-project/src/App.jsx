import { useState } from "react";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.ebi.ac.uk/ols4/api/search`,
        {
          params: {
            q: searchQuery,
            ontology: "efo",
          },
        }
      );

      setResults(response.data.response.docs);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6 flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 text-center drop-shadow-lg">
        Disease Search
      </h1>

      <div className="w-full max-w-xl mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a disease..."
            className="w-full p-4 pr-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-2 bottom-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="mt-4 text-blue-600 font-semibold">Loading...</div>
      )}

      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {result.label}
              </h3>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                {result.short_form}
              </span>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {result.description?.join(" ") || "No description available."}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && searchQuery && results.length === 0 && !error && (
        <div className="mt-6 text-gray-700 font-medium">
          No results found for "{searchQuery}".
        </div>
      )}
    </div>
  );
}

export default App;
