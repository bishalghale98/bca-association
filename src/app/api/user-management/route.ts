import { checkRole } from "@/lib/auth/checkRole";
import dbConnect from "@/lib/dbConnect";
import { handleApiError } from "@/lib/helper/apiError";
import { apiSuccess, apiError } from "@/lib/helper/apiResponse";
import User from "@/models/User";
import { ROLE } from "@/types/User";

export async function GET() {
  try {
    const { authorized, response } = await checkRole([
      ROLE.ADMIN,
      ROLE.SUPER_ADMIN,
    ]);
    if (!authorized) return response;

    await dbConnect();

    const users = await User.find().select("-password");

    // 4️⃣ Return success response
    return apiSuccess("User data fetched successfully", users);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
