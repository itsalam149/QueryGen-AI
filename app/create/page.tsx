'use client'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { FaMagic } from "react-icons/fa";
import { useState } from "react";

export default function GenerateWithAI() {
  const [query, setQuery] = useState("");
  const [generatedSQL, setGeneratedSQL] = useState("");

  const handleGenerate = async () => {
    if (!query) return;
    
    setGeneratedSQL(`SELECT * FROM users WHERE name LIKE '%${query}%';`);
  };

  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>
      <Navbar />
      <div className="relative flex flex-col items-center text-center p-6 w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-200">AI SQL Generator</h1>
        <h2 className="text-lg text-gray-400 mb-6 tracking-wide">
          Enter a natural language query below, and AI will generate an SQL statement.
        </h2>

        <textarea
          className="w-full p-4 h-32 bg-[#1E1E1E] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Example: Show me the top 10 customers by sales..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          className="w-full py-4 mt-4 text-lg font-semibold gap-3 bg-purple-600 hover:bg-purple-700 shadow-lg cursor-pointer"
          onClick={handleGenerate}
        >
          <FaMagic className="text-xl" /> Generate SQL
        </Button>

        {generatedSQL && (
          <div className="w-full mt-6 p-4 bg-[#1E1E1E] border border-gray-700 rounded-lg text-gray-300 text-sm overflow-x-auto">
            <p className="text-gray-400 mb-2">Generated SQL:</p>
            <code className="text-green-400">{generatedSQL}</code>
          </div>
        )}
      </div>
    </div>
  );
}
