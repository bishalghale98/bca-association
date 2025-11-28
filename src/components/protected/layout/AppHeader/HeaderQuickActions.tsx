"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";

export const HeaderQuickActions = () => {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="sm"
                className="
          h-9 rounded-lg transition-all duration-200
          hover:bg-gray-100 hover:shadow-sm active:scale-95
          focus:ring-2 focus:ring-blue-500/50
        "
            >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Quick Actions
            </Button>
        </div>
    );
};
