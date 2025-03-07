import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

export default function QueryResult({ query }) {
  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>
      <Navbar />
      <div className="relative flex flex-col items-center text-center p-6 w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-200">Generated SQL</h1>
        
        <div className="bg-[#1E1E1E] text-gray-300 p-6 rounded-lg shadow-md border border-gray-700 w-full text-left text-sm md:text-base font-mono overflow-auto">
          <pre>{query}</pre>
        </div>
        
        <Button className="mt-6 py-4 px-6 text-lg font-semibold gap-3 bg-purple-600 hover:bg-purple-700 shadow-lg cursor-pointer flex items-center">
          <FaArrowLeft className="text-xl" /> Generate Another Query
        </Button>
      </div>
    </div>
  );
}