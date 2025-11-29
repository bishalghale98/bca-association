'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import PasswordInput from '../../../components/Auth/PasswordInput';
import { ResetPasswordSchema } from '@/schemas/UserSchema';
import { toast } from 'sonner';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';


type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ResetPasswordForm>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: ResetPasswordForm) => {
        if (!token) {
            toast.error("Error", {
                description: "Token is not available"
            })
            return;
        }

        setIsLoading(true);
        try {
            const result = await axios.post('/api/auth/reset-password', { ...data, token })
            const res: ApiResponse = result.data

            toast.success("Success", {
                description: res.message
            })
            router.push('/sign-in');

        } catch (error: any) {
            console.error('Something went wrong', error)
            const ErrorMessage: ApiResponse = error.response.data
            toast.error('Error', { description: ErrorMessage.message })
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center space-y-4">
                <div className="flex justify-center">
                    <div className="bg-gray-900 dark:bg-white rounded-lg p-3 shadow-sm">
                        <ShieldCheck className="w-6 h-6 text-white dark:text-gray-900" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Reset your password
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Enter your new password below
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="px-8 pb-8 space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {/* New Password */}
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <PasswordInput
                                            label='Password'
                                            field={field}
                                            placeholder="Enter your new password"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <PasswordInput
                                            label='Confirm Password'
                                            field={field}
                                            placeholder="Confirm your new password"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Root Error */}
                        {form.formState.errors.root && (
                            <div className="text-sm text-red-600 dark:text-red-400 text-center">
                                {form.formState.errors.root.message}
                            </div>
                        )}

                        {/* Token Error */}
                        {!token && (
                            <div className="text-sm text-red-600 dark:text-red-400 text-center">
                                Invalid or missing reset token
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2"
                            disabled={isLoading || !token}
                        >
                            {isLoading && (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}
                            <span>{isLoading ? 'Resetting...' : 'Reset Password'}</span>
                            {!isLoading && <ArrowRight className="w-4 h-4" />}
                        </Button>
                    </form>
                </Form>

                {/* Back to Login */}
                <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Remember your password?{" "}
                        <button
                            onClick={() => router.push('/sign-in')}
                            className="font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                            Back to login
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ResetPasswordPage;