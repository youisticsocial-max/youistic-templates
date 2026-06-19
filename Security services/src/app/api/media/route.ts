import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Helper to ensure directory exists
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// GET: List all media files
export async function GET(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUploadDir();
    const files = await fs.readdir(UPLOAD_DIR);
    
    const mediaList = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(UPLOAD_DIR, filename);
        const stats = await fs.stat(filePath);
        return {
          name: filename,
          url: `/uploads/${filename}`,
          sizeBytes: stats.size,
          createdAt: stats.birthtime,
          isImage: /\.(jpg|jpeg|png|webp|gif)$/i.test(filename),
          isVideo: /\.(mp4|webm|ogg)$/i.test(filename),
          isDoc: /\.(pdf|doc|docx)$/i.test(filename),
        };
      })
    );

    return NextResponse.json(mediaList);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to read media library" }, { status: 500 });
  }
}

// POST: Upload a file
export async function POST(req: NextRequest) {
  try {
    // If it's a resume application, we allow public uploads. If it's general media, it can be public but restricted to validation.
    // However, to keep it simple, we allow both. Let's inspect the request headers or params.
    // For admin uploading media, let's verify session if it's explicitly marked as admin upload.
    const isCareer = req.nextUrl.searchParams.get("type") === "resume";
    if (!isCareer) {
      const session = getSession(req);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    await ensureUploadDir();
    
    // Clean filename
    const fileExt = path.extname(file.name);
    const baseName = path.basename(file.name, fileExt).toLowerCase().replace(/[^a-z0-9]/g, "-");
    const uniqueName = `${baseName}-${Date.now()}${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      name: uniqueName,
      url: `/uploads/${uniqueName}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

// DELETE: Delete a media file
export async function DELETE(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename } = await req.json();
    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    const filePath = path.join(UPLOAD_DIR, filename);
    
    // Safety check to prevent directory traversal
    const relative = path.relative(UPLOAD_DIR, filePath);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      return NextResponse.json({ error: "Access denied" }, { status: 400 });
    }

    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
