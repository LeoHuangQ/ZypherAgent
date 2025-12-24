import React, { useState, useRef, useEffect } from "react";

export default function SearchAgent() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [allQuery, setAllQuery] = useState("");
  const resultsEndRef = useRef(null);

  const scrollToBottom = () => {
    resultsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [results]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAllQuery((pre) => pre + "Question: " + query + ". ");
    const currentQuery = query;
    setQuery("");
    const requestQueryWithContext = allQuery + "Question: " + query + ". ";
    console.log("search query with context: ", requestQueryWithContext);
    let newResult = {
      id: Date.now(),
      query: currentQuery,
      result: null,
      error: null,
    };
    setResults([...results, newResult]);
    try {
      const response = await fetch("http://localhost:8000/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: requestQueryWithContext }),
      });

      const data = await response.json();
      setAllQuery((pre) => pre + "You answer: " + data.result + ". ");
      console.log("result in api response:", data);
      if (data.success) {
        newResult.result = data.result || "";
      } else {
        newResult.error = data.error || "Unknown error occurred";
      }
    } catch (err) {
      newResult.error = err instanceof Error ? err.message : "Connection error";
    } finally {
      setResults((prevResults) =>
        prevResults.map((item) =>
          item.id === newResult.id ? newResult : item
        )
      );
      setLoading(false);
    }
  };

  return (
    <div className="search-agent">
      <div className="results-container">
        {results.map((item) => (
          <div key={item.id} className="result-item">
            <div className="query-text">{item.query}</div>
            {item.result && <div className="result">{item.result}</div>}
            {item.error && <div className="error">{item.error}</div>}
          </div>
        ))}
        <div ref={resultsEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
          placeholder="Ask anything..."
          disabled={loading}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}
