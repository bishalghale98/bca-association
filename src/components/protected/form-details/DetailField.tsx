"use client";

export default function DetailField({
    icon,
    label,
    value,
    multiline = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    multiline?: boolean;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground">{icon}</div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                    {label}
                </p>
                <div
                    className={`text-sm ${multiline ? "whitespace-pre-wrap break-words" : "break-words"
                        }`}
                >
                    {value}
                </div>
            </div>
        </div>
    );
}
