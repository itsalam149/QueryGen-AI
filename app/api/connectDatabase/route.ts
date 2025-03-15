import { NextResponse } from "next/server";
import pkg from "pg"; // Import PostgreSQL client
const { Client } = pkg;

export async function POST(req: Response) {
  try {
    const { host, port, database, user, password } = await req.json();


    const client = new Client({
      host,
      port,
      database,
      user,
      password,
      ssl: { rejectUnauthorized: false }, 
    });

    await client.connect(); 

    await client.end();
    return NextResponse.json({ success: true, message: "Database connected successfully!" });
  } catch (error: unknown) {
    console.error("DB Connection Error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
