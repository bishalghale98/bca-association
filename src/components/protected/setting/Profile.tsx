"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { UpdateProfileFormSchema } from "@/schemas/UserSchema";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { handleAxiosError } from "@/lib/helper/errorHandler";
import { api } from "@/lib/api";

const Profile = () => {
    const [isSaved, setIsSaved] = useState(false);

    const form = useForm({
        resolver: zodResolver(UpdateProfileFormSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof UpdateProfileFormSchema>) => {
        setIsSaved(true);

        try {
            const result = await api.post('/admin/update-profile', data);
            const res: ApiResponse = result.data;

            toast.success("Success", {
                description: res.message
            });
        } catch (error: unknown) {
            handleAxiosError(error)
        }
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your name and email address</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Root-level error (at least one field required) */}
                        {form.formState.errors?.root?.message && (
                            <div className="text-red-600 font-medium">{form.formState.errors.root.message}</div>
                        )}

                        {/* Name field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Full name" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email address" {...field} />
                                    </FormControl>
                                    <FormDescription>We'll never share your email with anyone else.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit + success badge */}
                        <div className="flex items-center gap-4">
                            <Button type="submit">Save changes</Button>
                            {isSaved && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                    Changes saved successfully!
                                </Badge>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default Profile;
