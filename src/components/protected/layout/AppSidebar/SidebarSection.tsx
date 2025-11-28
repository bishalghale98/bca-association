import SidebarItem from "./SidebarItem";

export default function SidebarSection({
    title,
    items,
    isCollapsed,
}: {
    title: string;
    items: any[];
    isCollapsed: boolean;
}) {
    return (
        <div className="space-y-2">
            {!isCollapsed && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase">
                    {title}
                </h3>
            )}
            {items.map((item) => (
                <SidebarItem key={item.href} item={item} isCollapsed={isCollapsed} />
            ))}
        </div>
    );
}
