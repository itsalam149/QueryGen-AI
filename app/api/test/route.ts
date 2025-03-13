import { NextResponse } from "next/server";
import pool from "@/db"; // Import the database connection

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW();");
    return NextResponse.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
