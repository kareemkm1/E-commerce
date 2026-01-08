"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import {
  forgotPasswordSchema,
  verifyCodeSchema,
  resetPasswordSchema,
  ForgotPasswordInput,
  VerifyCodeInput,
  ResetPasswordInput
} from "@/app/schema/forgotPassword.schema"
import { forgotPassword, verifyResetCode, resetPassword } from "@/app/Api/auth.api"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Step = 'email' | 'code' | 'password'

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>('email')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const emailForm = useForm<ForgotPasswordInput>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const codeForm = useForm<VerifyCodeInput>({
    defaultValues: { resetCode: '' },
    resolver: zodResolver(verifyCodeSchema),
  })

  const passwordForm = useForm<ResetPasswordInput>({
    defaultValues: { newPassword: '', confirmPassword: '' },
    resolver: zodResolver(resetPasswordSchema),
  })

  async function handleEmailSubmit(values: ForgotPasswordInput) {
    setLoading(true)
    try {
      const res = await forgotPassword(values.email)
      if (res.statusMsg === 'success') {
        setEmail(values.email)
        setStep('code')
        toast.success('Reset code sent to your email', {
          position: 'top-center',
          style: { background: '#171717', color: '#fff', border: 'none' }
        })
      } else {
        toast.error(res.message || 'Failed to send reset code')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setLoading(false)
  }

  async function handleCodeSubmit(values: VerifyCodeInput) {
    setLoading(true)
    try {
      const res = await verifyResetCode(values.resetCode)
      if (res.status === 'Success') {
        setStep('password')
        toast.success('Code verified successfully', {
          position: 'top-center',
          style: { background: '#171717', color: '#fff', border: 'none' }
        })
      } else {
        toast.error(res.message || 'Invalid or expired code')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setLoading(false)
  }

  async function handlePasswordSubmit(values: ResetPasswordInput) {
    setLoading(true)
    try {
      const res = await resetPassword(email, values.newPassword)
      if (res.token) {
        toast.success('Password reset successfully', {
          position: 'top-center',
          style: { background: '#171717', color: '#fff', border: 'none' }
        })
        router.push('/login')
      } else {
        toast.error(res.message || 'Failed to reset password')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-light tracking-wider text-neutral-900">LUXE</span>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step === 'email' ? 'bg-[#c9a050] text-white' : 'bg-neutral-200 text-neutral-500'
            }`}>
              {step !== 'email' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : '1'}
            </div>
            <span className="ml-2 text-sm text-neutral-600">Email</span>
          </div>
          <div className="w-8 h-px bg-neutral-300 mx-2"></div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step === 'code' ? 'bg-[#c9a050] text-white' : step === 'password' ? 'bg-neutral-200 text-neutral-500' : 'bg-neutral-200 text-neutral-500'
            }`}>
              {step === 'password' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : '2'}
            </div>
            <span className="ml-2 text-sm text-neutral-600">Verify</span>
          </div>
          <div className="w-8 h-px bg-neutral-300 mx-2"></div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step === 'password' ? 'bg-[#c9a050] text-white' : 'bg-neutral-200 text-neutral-500'
            }`}>
              3
            </div>
            <span className="ml-2 text-sm text-neutral-600">Reset</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-neutral-200 p-8 md:p-10">
          {/* Step 1: Email */}
          {step === 'email' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-light text-neutral-900">Forgot Password</h1>
                <p className="text-neutral-500 mt-2 text-sm">Enter your email to receive a reset code</p>
              </div>

              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="Enter your email"
                            className="auth-input"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-neutral-900 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#c9a050] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : 'Send Reset Code'}
                  </button>
                </form>
              </Form>
            </>
          )}

          {/* Step 2: Verify Code */}
          {step === 'code' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-light text-neutral-900">Verify Code</h1>
                <p className="text-neutral-500 mt-2 text-sm">Enter the 6-digit code sent to {email}</p>
              </div>

              <Form {...codeForm}>
                <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} className="space-y-6">
                  <FormField
                    control={codeForm.control}
                    name="resetCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 text-sm font-medium">Reset Code</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Enter 6-digit code"
                            className="auth-input text-center tracking-widest text-lg"
                            maxLength={6}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-neutral-900 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#c9a050] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : 'Verify Code'}
                  </button>
                </form>
              </Form>

              <button
                onClick={() => setStep('email')}
                className="w-full mt-4 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Back to email
              </button>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 'password' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-light text-neutral-900">Reset Password</h1>
                <p className="text-neutral-500 mt-2 text-sm">Create a new password for your account</p>
              </div>

              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 text-sm font-medium">New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="Enter new password"
                            className="auth-input"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 text-sm font-medium">Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="Confirm new password"
                            className="auth-input"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#c9a050] text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#967534] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : 'Reset Password'}
                  </button>
                </form>
              </Form>
            </>
          )}

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-neutral-200"></div>
            <span className="px-4 text-xs text-neutral-400 uppercase tracking-wider">or</span>
            <div className="flex-1 border-t border-neutral-200"></div>
          </div>

          {/* Back to Login Link */}
          <p className="text-center text-sm text-neutral-600">
            Remember your password?{' '}
            <Link href="/login" className="text-[#c9a050] hover:text-[#967534] font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-400 mt-8">
          Need help? Contact our support team.
        </p>
      </div>
    </div>
  )
}
