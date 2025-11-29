import StudentForm from "@/models/StudentForm";
import { NextResponse } from "next/server";
import { ROLE } from "@/types/User";
import { checkRole } from "@/lib/auth/checkRole";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // -----------------------------
    // 1️⃣ Check Authentication
    // -----------------------------
    // 1️⃣ Check Role
    const { authorized, response } = await checkRole([
      ROLE.ADMIN,
      ROLE.SUPER_ADMIN,
    ]);

    if (!authorized) return response; // immediately block access

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is missing in the URL",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // 2️⃣ Find Form by ID
    // -----------------------------
    const form = await StudentForm.findById(id);

    if (!form) {
      return NextResponse.json(
        {
          success: false,
          message: "Form not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Form fetched successfully",
      data: form,
    });
  } catch (error: any) {
    console.error("GET /api/form/[id] Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
