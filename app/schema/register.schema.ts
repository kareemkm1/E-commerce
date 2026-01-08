import * as z from 'zod';

export const registerSchema = z.object({
    name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters long").max(20, "Name must be at most 20 characters long"),
    email: z.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
    rePassword: z.string().nonempty("Please re-enter your password"),
    phone: z.string().nonempty("Phone number is required").regex(/^(\+20|0)?1[0125]\d{8}$|^\+[1-9]\d{1,14}$/),
}).refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match"
})