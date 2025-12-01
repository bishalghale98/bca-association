import dbConnect from "@/lib/dbConnect";
import { validateSchema } from "@/lib/helper/validateSchema";
import User from "@/models/User";
import { passwordFormSchema } from "@/schemas/UserSchema";
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
    const validation = validateSchema(passwordFormSchema, body);
    if (!validation.success) {
      return apiError("Validation failed", 400, validation.errors);
    }

    const { current_password, password } = validation.data!;

    const isMatch = await bcrypt.compare(current_password, reqUser.password);
    if (!isMatch) {
      return apiError("Current password is incorrect", 401);
    }

    reqUser.password = await bcrypt.hash(password, 10);
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
