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
import { loginSchema } from "@/app/schema/login.schema"
import { signIn } from "next-auth/react"
import { ILogin } from "@/app/interface/login.interface"
import Link from "next/link"

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  async function handleLogin(value: ILogin) {
    await signIn('credentials', {
      email: value?.email,
      password: value?.password,
      redirect: true,
      callbackUrl: '/'
    })
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

        {/* Login Card */}
        <div className="bg-white border border-neutral-200 p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-neutral-900">Welcome Back</h1>
            <p className="text-neutral-500 mt-2 text-sm">Sign in to your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
              <FormField
                control={form.control}
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-neutral-700 text-sm font-medium">Password</FormLabel>
                      <Link href="/forgot-password" className="text-xs text-[#c9a050] hover:text-[#967534] transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Enter your password"
                        className="auth-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full py-3 bg-neutral-900 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#c9a050]"
              >
                Sign In
              </button>
            </form>
          </Form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-neutral-200"></div>
            <span className="px-4 text-xs text-neutral-400 uppercase tracking-wider">or</span>
            <div className="flex-1 border-t border-neutral-200"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-neutral-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#c9a050] hover:text-[#967534] font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-400 mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
