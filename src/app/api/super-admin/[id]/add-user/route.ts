import dbConnect from "@/lib/dbConnect";
import { validateSchema } from "@/lib/helper/validateSchema";
import User from "@/models/User";
import { AddUserBySuperAdmin } from "@/schemas/UserSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { ROLE } from "@/types/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { welcomeEmailTemplate } from "@/lib/emailTemplates/welcomeEmail";
import { requireRole } from "@/lib/auth/checkRole";
import { sendMail } from "../../../../../../sendMail/sendMail";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await context.params;

  const reqUser = await User.findById(id).select("+password");

  const roleCheck = requireRole(reqUser, [ROLE.SUPER_ADMIN]);
  if (roleCheck) return roleCheck;

  const body = await req.json();

  const validation = validateSchema(AddUserBySuperAdmin, body);
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

  const { name, email, password, reqUserPassword } = validation.data!;

  if (!reqUser || !reqUser.password) {
    return NextResponse.json(
      { success: false, message: "Super admin not found" },
      { status: 404 }
    );
  }

  const isMatch = await bcrypt.compare(reqUserPassword, reqUser?.password);

  if (!isMatch) {
    return NextResponse.json({
      success: false,
      message: "Your password is incorrect",
    });
  }

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

  const user = await User.create({
    name,
    email,
    password: passwordHash,
    role: ROLE.ADMIN,
  });

  await sendMail({
    to: user.email,
    subject: "Welcome! Your Account Has Been Created Successfully",
    html: welcomeEmailTemplate(user, password),
  });

  return NextResponse.json<ApiResponse>(
    {
      success: true,
      message: "User registered successfully",
    },
    { status: 201 }
  );
}
