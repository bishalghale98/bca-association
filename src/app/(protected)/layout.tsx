'use client'

import { Header } from "@/components/protected/layout/AppHeader/Header";
import Sidebar from "@/components/protected/layout/AppSidebar/Sidebar";
import { useState } from "react";




interface DashboardLayoutProps {
	children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};

	return (
		<div className="flex h-screen bg-gray-50/50">
			{/* Sidebar */}
			<Sidebar
				isCollapsed={isSidebarCollapsed}
			/>

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Header */}
				<Header
					onSidebarToggle={toggleSidebar}
					title="Dashboard"
					breadcrumbs={[]}
				/>

				{/* Page Content */}
				<main className="flex-1 overflow-auto p-6">
					{children}
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;