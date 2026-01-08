'use server'
import { Icheckout } from "@/app/interface/checkout.interface"
import getMyToken from "@/app/utilites/getMyToken"



export async function payProducts(formValue: Icheckout, cartId: string) {

    const token = await getMyToken()
    const tokenStr = token as string;



    const headers = {
        token: tokenStr,
        'content-type': 'application/json'
    }

    const payload = {
        shippingAddress: formValue


    }



    const baseUrl = process.env.NEXT_URL || 'http://localhost:3000'
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        }
    )

    let data = await res.json();
    return data;
}
