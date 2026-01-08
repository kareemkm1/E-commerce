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
import { registerSchema } from "@/app/schema/register.schema"
import axios, { AxiosError } from 'axios'
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { IRegister } from "@/app/interface/login.interface"
import Link from "next/link"

export default function Signup() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(registerSchema),
  })

  async function handleRegister(values: IRegister) {
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)

      if (response.data.message === 'success') {
        toast.success('Account created successfully!', {
          position: 'top-center',
          duration: 4000,
          style: {
            background: '#171717',
            color: '#fff',
            border: 'none',
          }
        });
        router.push('/login')
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || 'Something went wrong!', {
          position: 'top-center',
          duration: 4000,
          style: {
            background: '#dc2626',
            color: '#fff',
            border: 'none',
          }
        })
      } else {
        toast.error('Something went wrong!', {
          position: 'top-center',
          duration: 4000,
          style: {
            background: '#dc2626',
            color: '#fff',
            border: 'none',
          }
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-light tracking-wider text-neutral-900">LUXE</span>
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white border border-neutral-200 p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-neutral-900">Create Account</h1>
            <p className="text-neutral-500 mt-2 text-sm">Join us for a premium shopping experience</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 text-sm font-medium">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter your name"
                        className="auth-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 text-sm font-medium">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        placeholder="Enter your phone number"
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
                    <FormLabel className="text-neutral-700 text-sm font-medium">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Create a password"
                        className="auth-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 text-sm font-medium">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Confirm your password"
                        className="auth-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full py-3 bg-neutral-900 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#c9a050] mt-2"
              >
                Create Account
              </button>
            </form>
          </Form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-neutral-200"></div>
            <span className="px-4 text-xs text-neutral-400 uppercase tracking-wider">or</span>
            <div className="flex-1 border-t border-neutral-200"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#c9a050] hover:text-[#967534] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-400 mt-8">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
