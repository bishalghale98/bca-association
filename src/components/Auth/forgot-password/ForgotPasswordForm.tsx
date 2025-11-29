'use client'

import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordSchema } from '@/schemas/UserSchema'
import z from 'zod'
import axios from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ForgotPasswordForm() {
    const form = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: { email: '' },
    })

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
        setIsLoading(true)
        try {
            const result = await axios.post('/api/auth/request-reset', data)
            const res: ApiResponse = result.data
            toast.success('Success', { description: res.message })
        } catch (error: any) {
            console.error('Something went wrong', error)
            const ErrorMessage: ApiResponse = error.response.data
            toast.error('Error', { description: ErrorMessage.message })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="px-8 pb-8 space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>{isLoading ? 'Sending link...' : 'Send reset link'}</span>
                        {!isLoading && <ArrowRight className="w-4 h-4" />}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
