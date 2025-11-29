import dbConnect from "@/lib/dbConnect";
import { validateSchema } from "@/lib/helper/validateSchema";
import User from "@/models/User";
import { AddUserBySuperAdmin } from "@/schemas/UserSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { ROLE } from "@/types/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { welcomeEmailTemplate } from "@/lib/emailTemplates/welcomeEmail";
import { sendMail } from "../../../../../sendMail/sendMail";
import { checkRole } from "@/lib/auth/checkRole";

export async function POST(req: Request) {
  try {
    const { authorized, response, session } = await checkRole([
      ROLE.SUPER_ADMIN,
    ]);
    if (!authorized) return response;

    await dbConnect();

    const reqUser = await User.findById(session?.user?._id).select("+password");

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

    // 3️⃣ Verify the admin exists
    if (!reqUser || !reqUser.password) {
      return NextResponse.json(
        { success: false, message: "Super admin not found" },
        { status: 404 }
      );
    }

    // 4️⃣ Verify admin password before creating new user
    const isMatch = await bcrypt.compare(reqUserPassword, reqUser.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Your password is incorrect",
        },
        { status: 401 }
      );
    }

    // 5️⃣ Check if user already exists
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

    // 6️⃣ Hash new user password & create user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      role: ROLE.ADMIN, // Only admin creation allowed by super admin
    });

    // 7️⃣ Send welcome email with plain password
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
  } catch (error: any) {
    console.error("POST /api/admin/add-user Error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
