import { z } from "zod"

export const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
})

export const verifyCodeSchema = z.object({
  resetCode: z.string()
    .min(1, "Code is required")
    .length(6, "Code must be 6 digits")
})

export const resetPasswordSchema = z.object({
  newPassword: z.string()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
