'use client'

import { Input } from '@/components/ui/input'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'

interface PasswordInputProps {
    label?: string
    placeholder?: string
    field: any
    forgotPasswordLink?: string
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label = "Password", placeholder, field, forgotPasswordLink }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <FormItem className="space-y-2">
            <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {label}
                </FormLabel>
                {forgotPasswordLink && (
                    <Link href={forgotPasswordLink} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        Forgot password?
                    </Link>
                )}
            </div>
            <FormControl>
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={placeholder}
                        {...field}
                        className="w-full px-3 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white pr-12"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}

export default PasswordInput
