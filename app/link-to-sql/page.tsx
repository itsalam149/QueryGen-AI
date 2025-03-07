import Navbar from "@/components/Navbar";
import { FaClock } from "react-icons/fa";

export default function ComingSoon() {
  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>
      <Navbar />
      <div className="relative flex flex-col items-center text-center p-6">
        <FaClock className="text-7xl text-gray-400 mb-6" />
        <h1 className="text-5xl font-extrabold mb-3 text-gray-200">Coming Soon</h1>
        <h2 className="text-lg text-gray-400 max-w-xl tracking-wide">
          This service will be available soon. Stay tuned for updates!
        </h2>
      </div>
    </div>
  );
}