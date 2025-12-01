import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordFormSchema } from '@/schemas/UserSchema'
import { handleAxiosError } from '@/lib/helper/errorHandler'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/ApiResponse'
import { toast } from 'sonner'



type PasswordFormValues = z.infer<typeof passwordFormSchema>

const Password = () => {
    const [isSaved, setIsSaved] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    })

    const handleSubmit = async (data: PasswordFormValues) => {
        setIsSubmitting(true)

        try {
            const result = await api.put('/admin/change-password', data)
            const res: ApiResponse = result.data

            toast.success("Success", {
                description: res.message
            })
            setIsSaved(true)
            form.reset()
        } catch (error) {
            handleAxiosError(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                    Update your password here. After saving, you&apos;ll be logged out and need to sign in with your new password.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="Enter your current password"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="new-password"
                                            placeholder="Enter your new password"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Use at least 6 characters with a mix of letters, numbers and symbols.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password_confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="new-password"
                                            placeholder="Confirm your new password"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-2 sm:gap-4 sm:auto-flow-col sm:justify-start items-center">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto"
                            >
                                {isSubmitting ? "Saving..." : "Update Password"}
                            </Button>

                            {isSaved && (
                                <Badge
                                    variant="secondary"
                                    className=" text-green-700 px-10 w-full sm:w-auto text-center"
                                >
                                    Password updated successfully!
                                </Badge>
                            )}
                        </div>


                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Password