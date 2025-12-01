import axios from "axios";
import { toast } from "sonner";

export function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const msg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong";

    toast.error("Error", { description: msg });
    console.error("Axios Error →", msg);
    return;
  }

  console.error("Unknown Error →", error);
  toast.error("Error", { description: "Unexpected error occurred" });
}
