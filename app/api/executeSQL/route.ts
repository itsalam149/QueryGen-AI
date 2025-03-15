import { NextResponse } from "next/server";
import { Client } from "pg"; // PostgreSQL Client

export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    console.log("Received Request Body:", body); 

    const { dbConfig, sql } = body;
    
    if (!dbConfig || !sql) {
      return NextResponse.json({ success: false, error: "Database connection details and SQL query are required." }, { status: 400 });
    }

    const { host, port, user, password, database, ssl } = dbConfig;

    if (!host || !port || !user || !password || !database) {
      return NextResponse.json({ success: false, error: "Incomplete database credentials." }, { status: 400 });
    }

    const handleGenerate = async (query : string) => {
      if (!query) return;  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "https://query-gen-ai.vercel.app/"}/api/generateSQL`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
  
        return await response.json();
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      } finally {
      }
    };
    const ans = await handleGenerate(sql);
    // Create PostgreSQL client with dynamic credentials
    const client = new Client({
      host,
      port: Number(port) || 5432, 
      user,
      password,
      database,
      ssl: ssl !== false ? { rejectUnauthorized: false } : undefined, 
    });

    try {
      await client.connect();
      console.log("Executing SQL Query:", ans); 
      const result = await client.query(ans.sql); // Execute query
      return NextResponse.json({ success: true, data: result.rows }); // Return query result
    } catch (queryError) {
      console.error("SQL Execution Error:", queryError);
      const errorMessage = queryError instanceof Error ? queryError.message : "Query execution failed";
      return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    } finally {
      await client.end(); // Always close connection
    }
  } catch (error) {
    console.error("Server Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
