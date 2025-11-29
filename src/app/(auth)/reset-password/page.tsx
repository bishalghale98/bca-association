import { Suspense } from "react";
import ResetPasswordPage from "./client";

export default function ResetPasswordWrapper() {
    return (
        <Suspense fallback={<div>Loading reset form...</div>}>
            <ResetPasswordPage />
        </Suspense>
    );
}
