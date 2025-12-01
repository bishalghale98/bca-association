import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export function apiSuccess(
  message: string,
  data: unknown = null,
  status = 200
) {
  return NextResponse.json<ApiResponse>(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function apiError(
  message: string,
  status = 400 as number,
  error: unknown = null
) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message,
      error,
    },
    { status }
  );
}
