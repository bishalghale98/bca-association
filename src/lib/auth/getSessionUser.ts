import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    return {
      authorized: false,
      response: NextResponse.json<ApiResponse>(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  return { authorized: true, session };
}
