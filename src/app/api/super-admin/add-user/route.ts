import dbConnect from "@/lib/dbConnect";
import { validateSchema } from "@/lib/helper/validateSchema";
import User from "@/models/User";
import { AddUserBySuperAdmin } from "@/schemas/UserSchema";
import { ROLE } from "@/types/User";
import bcrypt from "bcryptjs";
import { welcomeEmailTemplate } from "@/lib/emailTemplates/welcomeEmail";
import { sendMail } from "../../../../../sendMail/sendMail";
import { checkRole } from "@/lib/auth/checkRole";
import { apiError, apiSuccess } from "@/lib/helper/apiResponse";
import { handleApiError } from "@/lib/helper/apiError";

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
      return apiError("Validation failed", 400, validation.errors);
    }

    const { name, email, password, reqUserPassword } = validation.data!;

    // 3️⃣ Verify the admin exists
    if (!reqUser || !reqUser.password) {
      return apiError("Super admin not found", 404);
    }

    const isMatch = await bcrypt.compare(reqUserPassword, reqUser.password);
    if (!isMatch) {
      return apiError("Your password is incorrect");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return apiError("Email is already registered", 400);
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

    return apiSuccess("User created successfully", 201);
  } catch (error: unknown) {
    handleApiError(error);
  }
}
