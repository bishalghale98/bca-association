'use client'

import React from 'react'
import { Form, FormField } from '../ui/form'

import { Input } from '../ui/input'
import { ArrowRight, Mail } from 'lucide-react'
import PasswordInput from './PasswordInput'
import { Button } from '../ui/button'
import z from 'zod'
import { RegisterSchema } from '@/schemas/UserSchema'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ApiResponse } from '@/types/ApiResponse'

const SignUpForm = () => {

    const form = useForm({
        resolver: zodResolver(RegisterSchema)
    })

    const router = useRouter()


    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        try {
            const result = await axios.post("/api/auth/sign-up", data);

            const res: ApiResponse = result.data

            if (res.success) {
                toast.success("Account created successfully!");
                router.push("/sign-in");
            } else {
                toast.error(res.data.message || "Something went wrong");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* name */}
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                Name
                            </label>
                            <Input
                                placeholder="Enter your name"
                                {...field}
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                            />
                        </div>
                    )}
                />


                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                            </label>
                            <Input
                                placeholder="Enter your email"
                                {...field}
                                className="w-full px-3 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                            />
                        </div>
                    )}
                />

                {/* Password */}
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => <PasswordInput field={field} />}
                />

                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                </Button>
            </form>
        </Form>
    )
}

export default SignUpForm