import { NextResponse } from "next/server";
import pool from "@/db"; // Import the database connection

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW();");
    return NextResponse.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error("Database error:", error);

    // Ensure error is treated as an Error object
    const errMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}
