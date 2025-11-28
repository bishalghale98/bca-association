import Link from "next/link";

export default function SidebarHeader({ isCollapsed }: { isCollapsed: boolean }) {
    return (
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {!isCollapsed ? (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                        <span className="text-sm font-bold text-white">BCA</span>
                    </div>
                    <div>
                        <Link href={'/'}>
                            <p className="font-bold text-gray-900">BCA Association</p>
                            <p className="text-xs text-gray-500">Tribhuvan University</p>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                    <span className="text-sm font-bold text-white">BCA</span>
                </div>
            )}
        </div>
    );
}
