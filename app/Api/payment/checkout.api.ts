'use server'
import { Icheckout } from "@/app/interface/checkout.interface"
import getMyToken from "@/app/utilites/getMyToken"



export async function payProducts(formValue: Icheckout, cartId: string, siteOrigin: string = '') {

    const token = await getMyToken()
    const tokenStr = token as string;



    const headers = {
        token: tokenStr,
        'content-type': 'application/json'
    }

    const payload = {
        shippingAddress: formValue


    }



    // prioritize client-provided origin if it's not localhost, otherwise skip env vars and use production fallback
    const isClientLocalhost = siteOrigin && /localhost|127\.0\.0\.1|::1/i.test(siteOrigin)
    const backendBase = (siteOrigin && !isClientLocalhost) ? siteOrigin : 'https://ecommerce.routemisr.com'
    // send site root to backend (backend will append /allorders itself) to avoid duplicate path
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(backendBase)}`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        }
    )

    let data = await res.json();
    return data;
}
