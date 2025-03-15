"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

interface QueryResult {
  rows: Record<string, string | number>[];
}

export default function ExecuteSQL() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dbConfig, setDbConfig] = useState<Record<string, string> | null>(null);

  // Load DB credentials from localStorage on mount
  useEffect(() => {
    const storedDbConfig = localStorage.getItem("dbConfig");
    if (storedDbConfig) {
      setDbConfig(JSON.parse(storedDbConfig));
    } else {
      setError("Database connection is missing. Please reconnect.");
    }
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleExecute = async () => {
    if (!dbConfig) {
      setError("Database connection is missing. Please reconnect.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/executeSQL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: query, dbConfig }),
      });

      const data: { success: boolean; data?: QueryResult; error?: string } = await response.json();

      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setError("Unexpected error occurred");
      console.error("Execution Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative">
      <Navbar/>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>
  
      <div className="z-10 w-[80%] max-w-3xl mt-40 flex flex-col items-center p-4 my-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">SQL Query Executor</h2>
  
        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
          rows={5}
          placeholder="Write your SQL query here..."
          value={query}
          onChange={handleQueryChange}
        ></textarea>
  
        <Button onClick={handleExecute} className="mt-4 px-13 py-8 text-white text-xl bg-blue-600 hover:bg-blue-700">
          {loading ? <Loader /> : "Execute"}
        </Button>
  
        {/* Show Error Message */}
        {error && <div className="mt-4 text-red-500 w-full">{error}</div>}
  
        {/* Show Query Result */}
        {result && (
          <div className="mt-4 w-full bg-gray-800 p-4 rounded flex flex-col">
            <h3 className="font-bold text-lg mb-2 text-white">Query Result:</h3>
            <div className="overflow-auto max-h-[50vh] w-full">
              <pre className="text-sm text-white whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );}