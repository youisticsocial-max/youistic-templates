import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.JWT_SECRET || "ibpss-elite-security-super-secret-key-32chars!";
const ALGORITHM = "aes-256-gcm";

export interface SessionPayload {
  username: string;
  role: string;
  expires: string;
}

// Encrypt Session
export function encryptSession(payload: SessionPayload): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET.slice(0, 32)), iv);
  
  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag().toString("hex");
  
  // Format: iv.encrypted.authTag
  return `${iv.toString("hex")}.${encrypted}.${authTag}`;
}

// Decrypt Session
export function decryptSession(token: string): SessionPayload | null {
  try {
    const [ivHex, encryptedHex, authTagHex] = token.split(".");
    if (!ivHex || !encryptedHex || !authTagHex) return null;

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET.slice(0, 32)), iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    const session = JSON.parse(decrypted) as SessionPayload;
    
    // Check expiration
    if (new Date(session.expires) < new Date()) {
      return null;
    }
    
    return session;
  } catch (err) {
    return null;
  }
}

// Get Session from request cookies
export function getSession(req: NextRequest): SessionPayload | null {
  const cookie = req.cookies.get("admin_session");
  if (!cookie) return null;
  return decryptSession(cookie.value);
}

// Set session cookie helper
export function setSessionCookie(res: NextResponse, payload: SessionPayload) {
  const encrypted = encryptSession(payload);
  res.cookies.set("admin_session", encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

// Clear session cookie helper
export function clearSessionCookie(res: NextResponse) {
  res.cookies.delete("admin_session");
}
