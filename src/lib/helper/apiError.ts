import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export function handleApiError(error: unknown) {
  console.error("API Error →", error);

  const message =
    error instanceof Error ? error.message : "Unknown server error";

  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message: "Something went wrong",
      error: message,
    },
    { status: 500 }
  );
}
