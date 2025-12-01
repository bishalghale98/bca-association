import User from "@/models/User";
import ResetToken from "@/models/ResetToken";
import { generateResetToken } from "@/lib/token";
import dbConnect from "@/lib/dbConnect";
import { sendMail } from "../../../../../sendMail/sendMail";
import { ForgotPasswordSchema } from "@/schemas/UserSchema";
import { validateSchema } from "@/lib/helper/validateSchema";
import { resetPasswordEmailTemplate } from "@/lib/emailTemplates/resetPasswordEmail";
import { apiError, apiSuccess } from "@/lib/helper/apiResponse";
import { handleApiError } from "@/lib/helper/apiError";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();

    const validation = validateSchema(ForgotPasswordSchema, body);
    if (!validation.success) {
      return apiError("Validation failed", 400, validation.errors);
    }
    const { email } = validation.data!;

    const user = await User.findOne({ email });
    if (!user) {
      return apiError("User not found", 404);
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

    return apiSuccess("Reset link send!");
  } catch (error: unknown) {
    handleApiError(error);
  }
}
