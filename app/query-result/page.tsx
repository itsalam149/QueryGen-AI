"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

interface QueryResult {
  rows: Record<string, string | number>[];
}

export default function QueryResultPage() {
  const [result, setResult] = useState<QueryResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedResult = sessionStorage.getItem("queryResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      router.push("/"); 
    }
  }, [router]);

  return (
    <div className="w-full h-screen bg-black text-white relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>
      <Navbar />

      <div className="relative flex flex-col items-center text-center p-6">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-200">Query Execution Result</h1>

        {result ? (
          <div className="mt-6 bg-gray-900 p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Query Result:</h3>
            <pre className="text-sm text-gray-400 mt-2 overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        ) : (
          <p className="text-gray-400">No results found. Redirecting...</p>
        )}

        <Button onClick={() => router.push("/")} className="mt-6 bg-blue-600 hover:bg-blue-700">
          Run Another Query
        </Button>
      </div>
    </div>
  );
}
