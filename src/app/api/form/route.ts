import dbConnect from "@/lib/dbConnect";
import { validateSchema } from "@/lib/helper/validateSchema";
import StudentForm from "@/models/StudentForm";
import { formSchema } from "@/schemas/StudentsForm";
import { ApiResponse } from "@/types/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../../../sendMail/sendMail";
import { studentFormEmailTemplate } from "@/lib/emailTemplates/studentFormEmail";
import { rateLimit } from "@/lib/rateLimit";

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
export async function POST(req: NextRequest) {
  try {
    const headers = rateLimit.checkNext(req, 10); // 1 requests per minute per IP
    if (headers.get("x-ratelimit-remaining") === "0") {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later." },
        { status: 429, headers }
      );
    }

    await dbConnect();

    const body = await req.json();

    const validation = validateSchema(formSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const data = validation.data!;

    const saved = await StudentForm.create({
      ...data,
      sourceIP: req.headers.get("x-forwarded-for") || "unknown",
    });

    await sendMail({
      to: saved.email,
      subject: "Thank you for submitting your Student Form",
      html: studentFormEmailTemplate(saved),
    });
    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
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
