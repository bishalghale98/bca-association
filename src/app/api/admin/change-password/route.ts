import dbConnect from "@/lib/dbConnect";
import { validateSchema } from "@/lib/helper/validateSchema";
import User from "@/models/User";
import { ChangePassword } from "@/schemas/UserSchema";
import bcrypt from "bcryptjs";
import { sendMail } from "../../../../../sendMail/sendMail";
import { getSessionUser } from "@/lib/auth/getSessionUser";
import { apiError, apiSuccess } from "@/lib/helper/apiResponse";
import { handleApiError } from "@/lib/helper/apiError";
import { passwordUpdatedEmail } from "@/lib/emailTemplates/passwordUpdated";

export async function PUT(req: Request) {
  try {
    const { authorized, response, session } = await getSessionUser();
    if (!authorized) return response;

    await dbConnect();

    const reqUser = await User.findById(session?.user?._id);
    if (!reqUser) {
      return apiError("User not found", 404);
    }

    const body = await req.json();
    const validation = validateSchema(ChangePassword, body);
    if (!validation.success) {
      return apiError("Validation failed", 400, validation.errors);
    }

    const { currentPassword, newPassword } = validation.data!;

    const isMatch = await bcrypt.compare(currentPassword, reqUser.password);
    if (!isMatch) {
      return apiError("Current password is incorrect", 401);
    }

    reqUser.password = await bcrypt.hash(newPassword, 10);
    await reqUser.save();

    await sendMail({
      to: reqUser.email as string,
      subject: "Password Updated Successfully",
      html: passwordUpdatedEmail({
        name: reqUser.name!,
        email: reqUser.email!,
      }),
    });

    return apiSuccess("Password changed successfylly");
  } catch (err: unknown) {
    handleApiError(err);
  }
}
