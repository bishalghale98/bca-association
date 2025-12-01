import { getSessionUser } from "@/lib/auth/getSessionUser";
import dbConnect from "@/lib/dbConnect";
import { handleApiError } from "@/lib/helper/apiError";
import { apiError, apiSuccess } from "@/lib/helper/apiResponse";
import { validateSchema } from "@/lib/helper/validateSchema";
import User from "@/models/User";
import { UpdateProfileFormSchema } from "@/schemas/UserSchema";

export async function POST(req: Request) {
  try {
    const { authorized, response, session } = await getSessionUser();
    if (!authorized) return response;

    await dbConnect();

    const reqUser = await User.findById(session?.user?._id);
    if (!reqUser) {
      return apiError("User not found", 404);
    }

    const body = await req.json();
    const validation = validateSchema(UpdateProfileFormSchema, body);

    if (!validation.success) {
      return apiError("Validation failed", 400, validation.errors);
    }

    const { name, email } = validation.data!;

    if (email !== undefined) {
      const userExistWithEmail = await User.findOne({ email });

      if (
        userExistWithEmail &&
        userExistWithEmail._id.toString() !== reqUser._id.toString()
      ) {
        return apiError("Email already taken", 400);
      }

      reqUser.email = email;
    }

    if (name !== undefined) reqUser.name = name;

    await reqUser.save();

    return apiSuccess("Profile update successfully");
  } catch (error: unknown) {
    handleApiError(error);
  }
}
