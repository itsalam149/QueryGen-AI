import { NextResponse } from "next/server";
import { decrypt } from "@/lib/crypto";  // Decrypt password
import { Client } from "pg";  // PostgreSQL Client
import prisma from "@/lib/prisma";  // Prisma DB connection

export async function POST(req: Request) {
  try {
    const { userId, sql } = await req.json(); // Get user ID and SQL query

    // Retrieve stored database credentials
    const userDbConfig = await prisma.userDatabase.findUnique({
      where: { id: Number(userId) },  
    });

    if (!userDbConfig) {
      return NextResponse.json({ success: false, error: "Database not connected" });
    }

    // Decrypt the stored password
    const decryptedPassword = decrypt(userDbConfig.encryptedPassword);

    // Connect to user's database
    const client = new Client({
      host: userDbConfig.host,
      port: Number(userDbConfig.port) || 5432, // Ensure port is a number
      user: userDbConfig.user,
      password: decryptedPassword,
      database: userDbConfig.database,
    });

    await client.connect(); // Connect to DB

    try {
      const result = await client.query(sql); // Execute SQL query
      await client.end(); // Close connection
      return NextResponse.json({ success: true, data: result.rows });
    } catch (queryError) {
      console.error("SQL Error:", queryError);
      return NextResponse.json({ success: false, error: "Query execution failed" });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" });
  }
}
