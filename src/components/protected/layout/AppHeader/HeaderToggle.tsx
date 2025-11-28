"use client";

import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export const HeaderToggle = ({ onClick }: { onClick?: () => void }) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            aria-label="Toggle Sidebar"
            className="
        h-9 w-9 rounded-lg transition-all duration-200
        hover:bg-gray-100 hover:shadow-sm active:scale-95
        focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2
        group
      "
        >
            <PanelLeft className="h-4 w-4 transition-transform group-hover:scale-110" />
        </Button>
    );
};
