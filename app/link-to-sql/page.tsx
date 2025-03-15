"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

export default function ConnectDatabase() {
  const [dbConfig, setDbConfig] = useState({
    host: "",
    port: "",
    user: "",
    password: "",
    database: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter(); // For redirection

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDbConfig({ ...dbConfig, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPopup(null);
  
    try {
      const response = await fetch("/api/connectDatabase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dbConfig),
      });
  
      const data = await response.json();
      if (data.success) {
        // Store database credentials in localStorage
        localStorage.setItem("dbConfig", JSON.stringify(dbConfig));
  
        setPopup({ message: "Database connected successfully! Redirecting...", type: "success" });
  
        setTimeout(() => {
          setPopup(null);
          router.push("/executeSQL");
        }, 1500);
      } else {
        setPopup({ message: "Connection failed: " + (data.error || "Unknown error"), type: "error" });
      }
    } catch (error) {
      console.error("Database Connection Error:", error);
      setPopup({ message: "Unexpected error occurred. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#121212] to-gray-900 animate-gradient"></div>
      <Navbar />

      {/* Popup for Success/Error Messages */}
      {popup && (
        <div className={`fixed top-10 px-4 py-2 rounded-lg text-white ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {popup.message}
        </div>
      )}

      <div className="w-full max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-md z-10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Connect Your Database</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 bg-gray-800 border border-gray-700 rounded" name="host" placeholder="Host" value={dbConfig.host} onChange={handleChange} required />
          <input className="w-full p-2 bg-gray-800 border border-gray-700 rounded" name="port" placeholder="Port" value={dbConfig.port} onChange={handleChange} required />
          <input className="w-full p-2 bg-gray-800 border border-gray-700 rounded" name="user" placeholder="Username" value={dbConfig.user} onChange={handleChange} required />
          <input className="w-full p-2 bg-gray-800 border border-gray-700 rounded" name="password" type="password" placeholder="Password" value={dbConfig.password} onChange={handleChange} required />
          <input className="w-full p-2 bg-gray-800 border border-gray-700 rounded" name="database" placeholder="Database Name" value={dbConfig.database} onChange={handleChange} required />

          {/* Show Loader while connecting */}
          {loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Connect
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
