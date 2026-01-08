import * as z from 'zod';

export const checkoutSchema = z.object({

    details: z.string().nonempty("Details are required"),
    city: z.string().nonempty("City is required"),
    phone: z.string().nonempty("Phone number is required").regex(/^01[0251][0-9]{8}$/),

})