import * as z from 'zod';

export const checkoutSchema = z.object({

    details: z.string().nonempty("Details are required"),
    city: z.string().nonempty("City is required"),
    phone: z.string().nonempty("Phone number is required").regex(/^(\+20|0)?1[0125]\d{8}$|^\+[1-9]\d{1,14}$/),

})