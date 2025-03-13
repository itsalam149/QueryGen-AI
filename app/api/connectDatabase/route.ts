import { NextResponse } from "next/server";
import { encrypt } from "@/lib/crypto";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { host, port, user, password, database } = await req.json();
    const encryptedPassword = encrypt(password);

    await prisma.userDatabase.create({
      data: { host, port: Number(port), user, encryptedPassword, database },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Connection Error:", error);
    return NextResponse.json({ success: false, error: "Failed to connect" });
  }
}
