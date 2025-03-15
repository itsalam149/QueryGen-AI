import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaDatabase, FaMagic } from "react-icons/fa";

export default function Home() {

  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>
      <Navbar />
      <div className="relative flex flex-col items-center text-center p-6">
        <h1 className="text-7xl font-extrabold mb-3 text-gray-200">QueryGen AI</h1>
        <h2 className="text-lg text-gray-100 max-w-xl tracking-wide">Generate Custom Query from Text</h2>
        <h3 className="text-md text-gray-400 mb-6 max-w-xl tracking-wide">
          AI-powered SQL query generator for quick and efficient database queries.
          <br/> Now You can connect your DB and use NL queries directly.
        </h3>
        
        <Link href="/create" className="w-full py-6 gap-3">
        <Button className="w-full py-6 text-lg font-semibold bg-purple-600 hover:bg-purple-700 shadow-lg cursor-pointer">
          <FaMagic className="text-xl" /> Generate SQL
        </Button>
      </Link>
      
      <Link href="/link-to-sql" className="w-full py-6">
        <Button className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg cursor-pointer">
          <FaDatabase className="text-xl" /> Use Your SQL
        </Button>
      </Link>
        
        <div className="max-w-2xl w-full text-center mb-6">
        </div>
      </div>
    </div>
  );
}
