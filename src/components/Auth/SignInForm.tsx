'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, ArrowRight } from 'lucide-react'
import PasswordInput from './PasswordInput'
import { LoginSchema } from '@/schemas/UserSchema'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import z from 'zod'
import { useRouter } from 'next/navigation'

const SignInForm = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema)
    })
    const router = useRouter()

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        })

        if (result?.error) {
            toast.error(result.error)
            return
        }

        // manual redirect
        router.push('/dashboard')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Email */}
                <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                            </label>
                            <Input
                                placeholder="you@example.com"
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
                    render={({ field }) => <PasswordInput field={field} forgotPasswordLink="/forgot-password" />}
                />

                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                </Button>
            </form>
        </Form>
    )
}

export default SignInForm
