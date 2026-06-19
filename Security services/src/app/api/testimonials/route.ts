import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { clientName, company, rating, feedback, clientImage, videoUrl } = await req.json();

    if (!clientName || !feedback) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        company: company || "",
        rating: rating || 5,
        feedback,
        clientImage: clientImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
        videoUrl: videoUrl || "",
      },
    });

    return NextResponse.json(testimonial);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
