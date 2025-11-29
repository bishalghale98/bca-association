'use client'

import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { useState } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordSchema } from '@/schemas/UserSchema'
import z from 'zod'

const ForgotPasswordPage = () => {

    const form = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ''
        }
    })
    const [isLoading, setIsLoading] = useState(false)




    const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
        setIsLoading(true)
        try {
            const result = await axios.post('/api/auth/request-reset', data)
            const res: ApiResponse = result.data

            toast.success("Success", {
                description: res.message
            })
        } catch (error: any) {

            console.error("Some thing went worng", error)

            const ErrorMessage: ApiResponse = error.response.data

            toast.error("Error", {
                description: ErrorMessage.message
            })

        } finally {
            setIsLoading(false)
        }



    }

    return (
        <>
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center space-y-4">
                <div className="flex justify-center">
                    <div className="bg-gray-900 dark:bg-white rounded-lg p-3 shadow-sm">
                        <MessageSquare className="w-6 h-6 text-white dark:text-gray-900" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Reset your password</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Enter your email and we&apos;ll send you a reset link
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="px-8 pb-8 space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </label>
                                    <Input
                                        placeholder="you@example.com"
                                        {...field}
                                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                        disabled={isLoading}
                                    />
                                </div>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}
                            <span>{isLoading ? 'Sending link...' : 'Send reset link'}</span>
                            {!isLoading && <ArrowRight className="w-4 h-4" />}
                        </Button>
                    </form>
                </Form>

                {/* Back to sign in */}
                <div className="text-center pt-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Remember your password?{" "}
                        <Link
                            href="/sign-in"
                            className="font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                            Back to sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordPage