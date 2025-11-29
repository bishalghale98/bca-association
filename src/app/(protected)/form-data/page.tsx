'use client';

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Loader2,
	User,
	Mail,
	Calendar,
	Eye,
	MessageSquare,
	Search,
	Filter,
	Phone,
} from "lucide-react";

type FormData = {
	_id: string;
	fullName: string;
	rollNumber: string;
	semester: string;
	email: string;
	phone: string;
	careerGoal: string;
	skills: string[];
	events: string[];
	suggestions?: string;
	contacted: boolean;
	sourceIP: string;
	createdAt: string;
};

type ApiResponse = {
	success: boolean;
	message: string;
	data: FormData[];
};

export default function FormDataTablePage() {
	const [formData, setFormData] = useState<FormData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterContacted, setFilterContacted] = useState<"all" | "contacted" | "not-contacted">("all");
	const router = useRouter();

	useEffect(() => {
		const fetchFormData = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await axios.get<ApiResponse>("/api/form");
				setFormData(res.data.data);
			} catch (err: any) {
				setError(err.message || "Failed to fetch data");
			} finally {
				setLoading(false);
			}
		};

		fetchFormData();
	}, []);

	// Filter data based on search and filter
	const filteredData = formData.filter((form) => {
		const matchesSearch =
			form.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			form.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			form.email.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesFilter =
			filterContacted === "all" ||
			(filterContacted === "contacted" && form.contacted) ||
			(filterContacted === "not-contacted" && !form.contacted);

		return matchesSearch && matchesFilter;
	});

	const handleViewDetails = (id: string) => {
		router.push(`/form-data/${id}`);
	};

	if (loading) return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
			<div className="text-center space-y-4">
				<Loader2 className="w-8 h-8 animate-spin text-gray-600 dark:text-gray-400 mx-auto" />
				<p className="text-gray-600 dark:text-gray-400">Loading form data...</p>
			</div>
		</div>
	);

	if (error) return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
			<div className="text-center space-y-4 w-full max-w-sm">
				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
					<p className="text-red-600 dark:text-red-400 font-medium text-sm">{error}</p>
				</div>
				<button
					onClick={() => router.refresh()}
					className="bg-gray-900 text-white px-4 py-3 rounded-lg text-sm font-medium w-full"
				>
					Try Again
				</button>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
						Form Submissions
					</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm">
						{filteredData.length} of {formData.length} submission{formData.length !== 1 ? 's' : ''}
					</p>
				</div>

				{/* Search and Filter Bar */}
				<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
					<div className="flex flex-col sm:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative">
							<Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
							<input
								type="text"
								placeholder="Search by name, roll number, or email..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
							/>
						</div>

						{/* Filter */}
						<div className="flex items-center space-x-3">
							<Filter className="w-4 h-4 text-gray-400 shrink-0" />
							<select
								value={filterContacted}
								onChange={(e) => setFilterContacted(e.target.value as any)}
								className="flex-1 sm:w-auto px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
							>
								<option value="all">All Contacts</option>
								<option value="contacted">Contact OK</option>
								<option value="not-contacted">Do Not Contact</option>
							</select>
						</div>
					</div>
				</div>

				{formData.length === 0 ? (
					<div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
						<div className="max-w-md mx-auto space-y-4">
							<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
								<MessageSquare className="w-8 h-8 text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								No submissions yet
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Form submissions will appear here once students start submitting their information.
							</p>
						</div>
					</div>
				) : (
					<div className="space-y-6">
						{/* Compact Cards Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{filteredData.map((form) => (
								<div
									key={form._id}
									className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all duration-200"
								>
									{/* Header - Minimal */}
									<div className="flex items-center  mb-3">
										<div className="flex items-center space-x-2">
											<div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
												<User className="w-4 h-4 text-white" />
											</div>
											<div className="min-w-0">
												<h3 className="font-medium text-gray-900 dark:text-white text-sm truncate max-w-[120px]">
													{form.fullName}
												</h3>
												<p className="text-gray-500 dark:text-gray-400 text-xs truncate">
													{form.rollNumber}
												</p>
											</div>
										</div>

									</div>

									{/* Basic Info - Compact */}
									<div className="space-y-2 mb-3">
										<div className="flex items-center space-x-2 text-xs">
											<Mail className="w-3 h-3 text-gray-400 shrink-0" />
											<span className="text-gray-600 dark:text-gray-400 truncate">
												{form.email.split('@')[0]}
											</span>
										</div>
										<div className="flex items-center space-x-2 text-xs">
											<Phone className="w-3 h-3 text-gray-400 shrink-0" />
											<span className="text-gray-600 dark:text-gray-400">
												{form.phone}
											</span>
										</div>
										<div className="flex items-center space-x-2 text-xs">
											<Calendar className="w-3 h-3 text-gray-400 shrink-0" />
											<span className="text-gray-600 dark:text-gray-400">
												Sem {form.semester}
											</span>
										</div>
									</div>

									{/* Skills - Minimal Preview */}
									{form.skills.length > 0 && (
										<div className="mb-3">
											<div className="flex flex-wrap gap-1">
												{form.skills.slice(0, 2).map((skill, idx) => (
													<span
														key={idx}
														className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
													>
														{skill}
													</span>
												))}
												{form.skills.length > 2 && (
													<span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
														+{form.skills.length - 2}
													</span>
												)}
											</div>
										</div>
									)}

									{/* Action Button */}
									<button
										onClick={() => handleViewDetails(form._id)}
										className="w-full flex items-center justify-center space-x-1 px-3 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200 border border-blue-200 dark:border-blue-800"
									>
										<Eye className="w-3 h-3" />
										<span>View</span>
									</button>
								</div>
							))}
						</div>

						{/* Empty filtered state */}
						{filteredData.length === 0 && formData.length > 0 && (
							<div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
								<div className="max-w-md mx-auto space-y-4">
									<Search className="w-16 h-16 text-gray-400 mx-auto" />
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
										No results found
									</h3>
									<p className="text-gray-600 dark:text-gray-400">
										Try adjusting your search or filter to find what you&apos;re looking for.
									</p>
									<button
										onClick={() => {
											setSearchTerm("");
											setFilterContacted("all");
										}}
										className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
									>
										Clear filters
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}