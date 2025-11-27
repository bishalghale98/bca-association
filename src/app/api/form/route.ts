import dbConnect from "@/lib/dbConnect";
import StudentForm from "@/models/StudentForm";
import { formSchema } from "@/schemas/StudentsForm";
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const data = await StudentForm.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Forms fetched successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/form error:", error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Failed to fetch form data",
      },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    // Validate using Zod
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const saved = await StudentForm.create({
      ...data,
      sourceIP: req.headers.get("x-forwarded-for") || "unknown",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        id: saved.id as string,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
