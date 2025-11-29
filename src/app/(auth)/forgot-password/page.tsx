import BackToSignIn from '@/components/Auth/forgot-password/BackToSignIn';
import ForgotPasswordForm from '@/components/Auth/forgot-password/ForgotPasswordForm';
import ForgotPasswordHeader from '@/components/Auth/forgot-password/ForgotPasswordHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Forgot Password | BCA Association',
    description: 'Reset your password for the BCA Association portal',
}


export default function ForgotPasswordPage() {
    return (
        <>
            <ForgotPasswordHeader />
            <ForgotPasswordForm />
            <BackToSignIn />
        </>
    )
}
