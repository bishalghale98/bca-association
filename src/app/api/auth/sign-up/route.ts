import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { RegisterSchema } from "@/schemas/UserSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";
import { ROLE } from "@/types/User";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();

    const parsed = RegisterSchema.safeParse(body);

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

    const { name, email, password } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Email is already registered",
        },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: passwordHash,
      role: ROLE.USER,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
