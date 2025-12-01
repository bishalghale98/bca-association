import StudentForm from "@/models/StudentForm";
import { NextResponse } from "next/server";
import { ROLE } from "@/types/User";
import { checkRole } from "@/lib/auth/checkRole";
import { apiError, apiSuccess } from "@/lib/helper/apiResponse";
import { handleApiError } from "@/lib/helper/apiError";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { authorized, response } = await checkRole([
      ROLE.ADMIN,
      ROLE.SUPER_ADMIN,
    ]);

    if (!authorized) return response;

    const { id } = await context.params;

    if (!id) {
      return apiError("ID is missing in the URL", 400);
    }

    const form = await StudentForm.findById(id);

    if (!form) {
      return apiError("Form not found", 400);
    }

    return apiSuccess("Form Fetched Successfully", form);
  } catch (error: unknown) {
    handleApiError(error);
  }
}
