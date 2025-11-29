import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import ResetToken from "@/models/ResetToken";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { sendMail } from "../../../../../sendMail/sendMail";
import { PasswordResetEmail } from "@/lib/emailTemplates/passwordResetEmail";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { token, password } = await req.json();

    const savedToken = await ResetToken.findOne({ token });
    if (!savedToken) {
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        { status: 400 }
      );
    }

    if (savedToken.expiresAt < new Date()) {
      return NextResponse.json(
        {
          message: "Token expired",
        },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(savedToken.userId, {
      password: hashed,
    });

    await ResetToken.deleteOne({ token });

    await sendMail({
      to: user?.email as string,
      subject: "Password Updated Successfully",
      html: PasswordResetEmail({ userEmail: user?.email as string }),
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
