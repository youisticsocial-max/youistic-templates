import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(applications);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, mobileNumber, address, experience, preferredPosition, resumePath } = await req.json();

    if (!fullName || !mobileNumber || !experience || !preferredPosition) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const application = await prisma.jobApplication.create({
      data: {
        fullName,
        mobileNumber,
        address: address || "",
        experience,
        preferredPosition,
        resumePath: resumePath || "",
      },
    });

    return NextResponse.json({ success: true, data: application });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
