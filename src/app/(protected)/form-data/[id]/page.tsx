"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
    RefreshCw,
    User,
    Mail,
    Phone,
    School,
    Hash,
    Target,
    Code,
    Calendar,
    Globe,
    MessageSquare,
    Lightbulb
} from "lucide-react";
import { useParams } from "next/navigation";

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

export default function FormDetailPage() {
    const params = useParams()
    const { id } = params;

    const [data, setData] = useState<FormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFormDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(`/api/form/${id}`);
            setData(res.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Failed to load form");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFormDetail();
    }, [id]);

    // Loading State
    if (loading) {
        return (
            <div className="container max-w-4xl py-8">
                <Card>
                    <CardHeader className="pb-4">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-5 w-full max-w-96" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="container max-w-4xl py-8">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription className="flex items-center justify-between">
                        <span>{error}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchFormDetail}
                            className="ml-4"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // Empty State
    if (!data) {
        return (
            <div className="container max-w-4xl py-8">
                <Alert>
                    <AlertTitle>No data found</AlertTitle>
                    <AlertDescription>
                        No form data found for the specified ID.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl py-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-2xl font-bold">Student Registration Details</CardTitle>
                        <CardDescription>ID: {data._id.slice(0, 6)}...</CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchFormDetail}
                        className="h-8 w-8 p-0"
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span className="sr-only">Refresh</span>
                    </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Personal Information Section */}
                    <Section title="Personal Information">
                        <DetailField
                            icon={<User className="h-4 w-4" />}
                            label="Full Name"
                            value={data.fullName}
                        />
                        <DetailField
                            icon={<Mail className="h-4 w-4" />}
                            label="Email"
                            value={data.email}
                        />
                        <DetailField
                            icon={<Phone className="h-4 w-4" />}
                            label="Phone"
                            value={data.phone}
                        />
                    </Section>

                    <Separator />

                    {/* Academic Information Section */}
                    <Section title="Academic Information">
                        <DetailField
                            icon={<School className="h-4 w-4" />}
                            label="Semester"
                            value={data.semester}
                        />
                        <DetailField
                            icon={<Hash className="h-4 w-4" />}
                            label="Roll Number"
                            value={data.rollNumber}
                        />
                    </Section>

                    <Separator />

                    {/* Career & Skills Section */}
                    <Section title="Career & Skills">
                        <DetailField
                            icon={<Target className="h-4 w-4" />}
                            label="Career Goal"
                            value={data.careerGoal}
                            multiline
                        />

                        <div className="space-y-2">
                            <FieldLabel icon={<Code className="h-4 w-4" />} label="Skills" />
                            <div className="flex flex-wrap gap-2">
                                {data.skills.length > 0 ? (
                                    data.skills.map((skill, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="px-2 py-1"
                                        >
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-muted-foreground">
                                        No skills specified
                                    </span>
                                )}
                            </div>
                        </div>
                    </Section>

                    <Separator />

                    {/* Events & Activities Section */}
                    <Section title="Events & Activities">
                        <div className="space-y-2">
                            <FieldLabel icon={<Calendar className="h-4 w-4" />} label="Events Interested In" />
                            <div className="flex flex-wrap gap-2">
                                {data.events.length > 0 ? (
                                    data.events.map((event, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="px-2 py-1"
                                        >
                                            {event}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-muted-foreground">
                                        No events selected
                                    </span>
                                )}
                            </div>
                        </div>

                        <DetailField
                            icon={<Lightbulb className="h-4 w-4" />}
                            label="Suggestions"
                            value={data.suggestions || "No suggestions provided"}
                            multiline
                        />
                    </Section>

                    <Separator />

                    {/* System Information Section */}
                    <Section title="System Information">
                        <DetailField
                            icon={<MessageSquare className="h-4 w-4" />}
                            label="Contact Status"
                            value={
                                <Badge
                                    variant={data.contacted ? "default" : "secondary"}
                                    className={data.contacted ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                                >
                                    {data.contacted ? "Contacted" : "Not Contacted"}
                                </Badge>
                            }
                        />
                        <DetailField
                            icon={<Globe className="h-4 w-4" />}
                            label="Source IP"
                            value={data.sourceIP}
                        />
                        <DetailField
                            icon={<Calendar className="h-4 w-4" />}
                            label="Submitted At"
                            value={new Date(data.createdAt).toLocaleString()}
                        />
                    </Section>
                </CardContent>
            </Card>
        </div>
    );
}

// Section Component
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

// Detail Field Component
function DetailField({
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
            <div className="mt-0.5 text-muted-foreground">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                    {label}
                </p>
                <div className={`text-sm ${multiline ? "whitespace-pre-wrap break-words" : "break-words"}`}>
                    {value}
                </div>
            </div>
        </div>
    );
}

// Field Label Component
function FieldLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium text-muted-foreground">
                {label}
            </span>
        </div>
    );
}