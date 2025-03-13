"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

interface QueryResult {
  rows: Record<string, string | number>[];
}

export default function ExecuteSQL() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/executeSQL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: query }),
      });

      const data: { success: boolean; data?: QueryResult; error?: string } = await response.json();

      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setError("Unexpected error occurred");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>

      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-white">SQL Query Executor</h2>

        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
          rows={5}
          placeholder="Write your SQL query here..."
          value={query}
          onChange={handleQueryChange}
        ></textarea>

        <Button onClick={handleExecute} className="mt-4 bg-blue-600 hover:bg-blue-700">
          {loading ? <Loader /> : "Execute"}
        </Button>

        {/* Show Query Result or Error */}
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {result && (
          <div className="mt-4 w-full bg-gray-800 p-4 rounded">
            <h3 className="font-bold text-lg mb-2 text-white">Query Result:</h3>
            <pre className="text-sm text-white">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
