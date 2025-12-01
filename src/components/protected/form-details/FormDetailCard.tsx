"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function FormDetailCard({
    children,
    onRefresh,
    id,
}: {
    children: React.ReactNode;
    onRefresh: () => void;
    id: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 pb-4">
                <div className="min-w-0">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold break-words">
                        Student Form Detail
                    </CardTitle>

                    <CardDescription className="text-sm text-muted-foreground truncate sm:truncate-none">
                        ID: {id.slice(0, 6)}...
                    </CardDescription>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    className="h-8 w-8 p-0"
                >
                    <RefreshCw className="h-4 w-4" />
                    <span className="sr-only">Refresh</span>
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">{children}</CardContent>
        </Card>
    );
}
