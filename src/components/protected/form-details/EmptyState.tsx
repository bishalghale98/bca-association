"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EmptyState({ onBack }: { onBack: () => void }) {
    return (
        <div className="container max-w-4xl py-8">
            <Alert>
                <AlertTitle>No data found</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                    <span>No form data found for the specified ID.</span>

                    <Button variant="outline" size="sm" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                </AlertDescription>
            </Alert>
        </div>
    );
}
