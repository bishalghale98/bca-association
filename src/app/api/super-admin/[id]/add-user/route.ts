import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { RegisterSchema } from "@/schemas/UserSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { ROLE } from "@/types/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await dbConnect();

  const reqUser = await User.findById(id);

  if (!reqUser) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 }
    );
  }

  if (reqUser.role !== ROLE.SUPER_ADMIN) {
    return NextResponse.json(
      {
        message: "You donot have access to add the users",
      },
      { status: 403 }
    );
  }

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

  return NextResponse.json({
    message: "User fetched",
    userId: id,
    role: reqUser.role, // ✅ now accessible
  });
}
