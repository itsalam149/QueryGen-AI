"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { FaMagic } from "react-icons/fa";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function CreateQuery() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition(); 
  const router = useRouter();

  const handleGenerate = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await fetch("/api/generateSQL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (data.sql) {
        startTransition(() => {
          router.push(`/query?sql=${encodeURIComponent(data.sql)}`);
        });
      } else {
        alert("Error generating SQL. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center">
      <Navbar />
      <div className="p-6 max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-200">AI SQL Generator</h1>
        <h2 className="text-lg text-gray-400 mb-6">
          Enter a natural language query below, and AI will generate an SQL statement.
        </h2>

        <textarea
          className="w-full p-4 h-32 bg-gray-800 border border-gray-700 rounded-lg text-gray-300"
          placeholder="Example: Show me the top 10 customers by sales..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading} // Disable textarea while loading
        />

        <Button
          className="w-full py-4 mt-4 text-lg font-semibold bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
          onClick={handleGenerate}
          disabled={loading || isPending} // Disable button during transition
        >
          {loading ? "Generating..." : <><FaMagic className="text-xl mr-2" /> Generate SQL</>}
        </Button>

        {isPending && (
          <div className="mt-3 text-gray-400 text-sm animate-pulse">Loading...</div>
        )}
      </div>
    </div>
  );
}
