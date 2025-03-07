import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaDatabase, FaMagic } from "react-icons/fa";

export default function Home() {
  const predefinedQueries = [
    { label: "Top 5 customers", query: "SELECT customer_name, SUM(amount) FROM transactions GROUP BY customer_name ORDER BY SUM(amount) DESC LIMIT 5;" },
    { label: "Sales per month", query: "SELECT MONTH(date) AS month, SUM(amount) FROM sales GROUP BY MONTH(date);" },
    { label: "Employees with salary > 50K", query: "SELECT * FROM employees WHERE salary > 50000;" },
    { label: "Most popular product", query: "SELECT product_name, COUNT(*) FROM orders GROUP BY product_name ORDER BY COUNT(*) DESC LIMIT 1;" },
    { label: "Revenue per category", query: "SELECT category, SUM(price * quantity) FROM products GROUP BY category;" },
    { label: "Inactive users", query: "SELECT * FROM users WHERE last_login < NOW() - INTERVAL 6 MONTH;" },
  ];

  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>
      <Navbar />
      <div className="relative flex flex-col items-center text-center p-6">
        <h1 className="text-7xl font-extrabold mb-3 text-gray-200">QueryGen AI</h1>
        <h2 className="text-lg text-gray-100 max-w-xl tracking-wide">Generate Custom Query from Text</h2>
        <h3 className="text-md text-gray-400 mb-6 max-w-xl tracking-wide">
          AI-powered SQL query generator for quick and efficient database queries.
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
          <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Predefined Queries</h3>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mt-4">
          {predefinedQueries.map((item, index) => (
            <div 
              key={index} 
              className="p-4 bg-[#1E1E1E] rounded-lg shadow-md border border-gray-700 text-gray-300 text-center flex items-center justify-center gap-3 hover:bg-gray-800 transition duration-300 text-sm font-medium cursor-pointer"
            >
              <FaChartBar className="text-lg text-gray-400" /> {item.label}
            </div>
          ))}
        </div> */}
        </div>
      </div>
    </div>
  );
}
