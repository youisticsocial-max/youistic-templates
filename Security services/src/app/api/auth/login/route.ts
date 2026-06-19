import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin || admin.passwordHash !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const expires = new Date();
    expires.setHours(expires.getHours() + 24);

    const response = NextResponse.json({
      success: true,
      user: { username: admin.username, role: admin.role },
    });

    setSessionCookie(response, {
      username: admin.username,
      role: admin.role,
      expires: expires.toISOString(),
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
