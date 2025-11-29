import { NextResponse } from "next/server";
import User from "@/models/User";
import ResetToken from "@/models/ResetToken";
import { generateResetToken } from "@/lib/token";
import dbConnect from "@/lib/dbConnect";
import { sendMail } from "../../../../../sendMail/sendMail";
import { ForgotPasswordSchema } from "@/schemas/UserSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { validateSchema } from "@/lib/helper/validateSchema";
import { resetPasswordEmailTemplate } from "@/lib/emailTemplates/resetPasswordEmail";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();

    const validation = validateSchema(ForgotPasswordSchema, body);
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
    const { email } = validation.data!;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const token = generateResetToken();

    await ResetToken.findOneAndUpdate(
      { userId: user._id },
      { token, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
      { upsert: true }
    );

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await sendMail({
      to: email,
      subject: "Reset your password",
      html: resetPasswordEmailTemplate(resetLink),
    });

    return NextResponse.json({ message: "Reset link sent!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
