import bcrypt from "bcryptjs";
import ResetToken from "@/models/ResetToken";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { sendMail } from "../../../../../sendMail/sendMail";
import { PasswordResetEmail } from "@/lib/emailTemplates/passwordResetEmail";
import { validateSchema } from "@/lib/helper/validateSchema";
import { ResetPasswordSchema } from "@/schemas/UserSchema";
import { apiError, apiSuccess } from "@/lib/helper/apiResponse";
import { handleApiError } from "@/lib/helper/apiError";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();

    const validation = validateSchema(ResetPasswordSchema, body);
    if (!validation.success) {
      return apiError("Validation failed", 400, validation.errors);
    }
    const { token, password } = validation.data!;

    const savedToken = await ResetToken.findOne({ token });
    if (!savedToken) {
      return apiError("Invalid token", 400);
    }

    if (savedToken.expiresAt < new Date()) {
      return apiError("Token expired", 400);
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(savedToken.userId, {
      password: hashed,
    });

    await ResetToken.deleteOne({ token });

    const signInLink = `${process.env.NEXT_PUBLIC_APP_URL}/sign-in`;

    await sendMail({
      to: user?.email as string,
      subject: "Password Updated Successfully",
      html: PasswordResetEmail({
        userEmail: user?.email as string,
        signInLink,
      }),
    });

    return apiSuccess("Password updated successfully");
  } catch (error: unknown) {
    handleApiError(error);
  }
}
