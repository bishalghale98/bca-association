"use client";

export default function FieldLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
