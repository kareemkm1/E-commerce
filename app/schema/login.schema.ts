import * as z from 'zod';

export const loginSchema = z.object({
    
    email: z.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
    
   
})