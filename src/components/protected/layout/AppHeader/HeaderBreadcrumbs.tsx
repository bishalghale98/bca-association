"use client";

export const HeaderBreadcrumbs = ({
    title,
    breadcrumbs,
}: {
    title: string;
    breadcrumbs: Array<{ label: string; href?: string }>;
}) => {
    return (
        <nav aria-label="Breadcrumb" className="hidden sm:flex">
            <ol className="flex items-center gap-2 text-sm">
                <li>
                    <span className="text-gray-900 font-medium tracking-tight">
                        {title}
                    </span>
                </li>

                {breadcrumbs.length > 0 && (
                    <>
                        <li className="text-gray-400">/</li>

                        {breadcrumbs.map((crumb, i) => (
                            <li key={i} className="flex items-center">
                                {crumb.href ? (
                                    <a
                                        href={crumb.href}
                                        className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        {crumb.label}
                                    </a>
                                ) : (
                                    <span className="text-gray-600">{crumb.label}</span>
                                )}

                                {i < breadcrumbs.length - 1 && (
                                    <span className="text-gray-400 ml-2">/</span>
                                )}
                            </li>
                        ))}
                    </>
                )}
            </ol>
        </nav>
    );
};
