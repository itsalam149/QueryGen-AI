"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaCopy, FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QueryResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [sqlQuery, setSqlQuery] = useState<string>("Loading...");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get SQL query only when the component is mounted
    if (searchParams) {
      setSqlQuery(searchParams.get("sql") || "No query generated");
    }
  }, [searchParams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center">
      <Navbar />
      <div className="p-6 max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold mb-6">Generated SQL</h1>

        <div className="relative bg-gray-800 p-12 rounded-lg text-sm font-mono overflow-auto w-full">
          {/* Ensure query is only displayed after fetching */}
          <pre className="text-left">{sqlQuery}</pre>

          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
          </button>
        </div>

        <Button
          className="mt-6 bg-purple-600 hover:bg-purple-700 flex items-center"
          onClick={() => router.push("/create")}
        >
          <FaArrowLeft className="mr-2" /> Generate Another Query
        </Button>
      </div>
    </div>
  );
}
