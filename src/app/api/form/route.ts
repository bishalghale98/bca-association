import dbConnect from "@/lib/dbConnect";
import { validateSchema } from "@/lib/helper/validateSchema";
import StudentForm from "@/models/StudentForm";
import { formSchema } from "@/schemas/StudentsForm";
import { ApiResponse } from "@/types/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../../../sendMail/sendMail";
import { studentFormEmailTemplate } from "@/lib/emailTemplates/studentFormEmail";
import { rateLimit } from "@/lib/rateLimit";
import { checkRole } from "@/lib/auth/checkRole";
import { ROLE } from "@/types/User";
import { handleApiError } from "@/lib/helper/apiError";
import { apiError, apiSuccess } from "@/lib/helper/apiResponse";

// get all form route
export async function GET(req: Request) {
  try {
    // 1️⃣ Role check
    const { authorized, response } = await checkRole([
      ROLE.ADMIN,
      ROLE.SUPER_ADMIN,
    ]);
    if (!authorized) return response;

    await dbConnect();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10); // default page 1
    const limit = parseInt(url.searchParams.get("limit") || "10", 10); // default 10 items per page
    const skip = (page - 1) * limit;

    // 3️⃣ Fetch data with pagination
    const total = await StudentForm.countDocuments();
    const data = await StudentForm.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Forms fetched successfully",
        data,
        meta: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const headers = rateLimit.checkNext(req, 10); 
    if (headers.get("x-ratelimit-remaining") === "0") {
      return apiError("Too many requests. Try again later.", 429);
    }

    await dbConnect();

    const body = await req.json();

    const validation = validateSchema(formSchema, body);
    if (!validation.success) {
      return apiError("Validation failed", 400, validation.errors);
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
    return apiSuccess("Form submitted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
