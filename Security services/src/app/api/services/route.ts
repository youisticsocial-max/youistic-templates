import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, shortDescription, longDescription, features, benefits, category, image } = await req.json();

    if (!name || !shortDescription || !longDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        icon: "Shield",
        shortDescription,
        longDescription,
        features: features || "",
        benefits: benefits || "",
        category: category || "MANPOWER",
        image: image || "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=800",
      },
    });

    return NextResponse.json(service);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
