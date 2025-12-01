"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
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
    Lightbulb,
    ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { handleAxiosError } from "@/lib/helper/errorHandler";
import LoadingState from "@/components/protected/form-details/LoadingState";
import ErrorState from "@/components/protected/form-details/ErrorState";
import EmptyState from "@/components/protected/form-details/EmptyState";
import FormDetailCard from "@/components/protected/form-details/FormDetailCard";
import FormDetailSection from '../../../../components/protected/form-details/FormDetailSection';
import DetailField from "@/components/protected/form-details/DetailField";
import FieldLabel from "@/components/protected/form-details/FieldLabel";

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
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [data, setData] = useState<FormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get(`/api/form/${id}`);
            setData(res.data.data);
        } catch (err: any) {
            handleAxiosError(err);

            const error = err.response?.data?.message
            setError(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const goBack = () => router.back();

    if (loading) return <LoadingState onBack={goBack} />;
    if (error) return <ErrorState message={error} onBack={goBack} onRetry={fetchData} />;
    if (!data) return <EmptyState onBack={goBack} />;

    return (
        <div className="container max-w-4xl py-8">
            {/* Back button */}
            <Button
                variant="outline"
                size="sm"
                onClick={goBack}
                className="h-8 w-8 p-0 mb-4"
            >
                <ArrowLeft className="h-4 w-4" />
            </Button>

            <FormDetailCard onRefresh={fetchData} id={data._id}>
                {/* PERSONAL INFO */}
                <FormDetailSection title="Personal Information">
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
                </FormDetailSection>

                <Separator />

                {/* ACADEMIC INFO */}
                <FormDetailSection title="Academic Information">
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
                </FormDetailSection>

                <Separator />

                {/* CAREER & SKILLS */}
                <FormDetailSection title="Career & Skills">
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
                                    <Badge variant="outline" key={index}>
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
                </FormDetailSection>

                <Separator />

                {/* EVENTS */}
                <FormDetailSection title="Events & Activities">
                    <div className="space-y-2">
                        <FieldLabel
                            icon={<Calendar className="h-4 w-4" />}
                            label="Events Interested In"
                        />

                        <div className="flex flex-wrap gap-2">
                            {data.events.length > 0 ? (
                                data.events.map((event, i) => (
                                    <Badge variant="secondary" key={i}>
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
                </FormDetailSection>

                <Separator />

                {/* SYSTEM INFO */}
                <FormDetailSection title="System Information">
                    <DetailField
                        icon={<MessageSquare className="h-4 w-4" />}
                        label="Contact Status"
                        value={
                            <Badge
                                variant={data.contacted ? "default" : "secondary"}
                                className={
                                    data.contacted
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : ""
                                }
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
                </FormDetailSection>
            </FormDetailCard>
        </div>
    );
}
