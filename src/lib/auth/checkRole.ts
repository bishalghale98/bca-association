import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function checkRole(allowedRoles: string[]) {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;


  if (!role || !allowedRoles.includes(role)) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Insufficient permissions",
        },
        { status: 401 }
      ),
    };
  }

  return { authorized: true, session };
}
