import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { ChangePassword } from "@/schemas/UserSchema";
import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await dbConnect();

    const reqUser = await User.findById(id);
    if (!reqUser) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const parsed = ChangePassword.safeParse(body);

    if (!parsed.success) {
      const flattenedErrors = parsed.error.flatten();
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Validation failed",
          errors: flattenedErrors.fieldErrors,
        },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = parsed.data;

    const isMatch = await bcrypt.compare(currentPassword, reqUser.password);
    if (!isMatch) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Hash and save new password
    reqUser.password = await bcrypt.hash(newPassword, 10);
    await reqUser.save();

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err: any) {
    console.error("Error changing password:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
        errors: { server: [err.message] },
      },
      { status: 500 }
    );
  }
}
