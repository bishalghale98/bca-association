import { NextResponse } from "next/server";

export function requireRole(reqUser: any, allowedRoles: string[]) {
  if (!reqUser || !allowedRoles.includes(reqUser.role)) {
    return NextResponse.json(
      {
        success: false,
        message: "You do not have permission to perform this action",
      },
      { status: 403 }
    );
  }

  return null; // means allowed
}
