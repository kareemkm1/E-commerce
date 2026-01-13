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



    const rawUrl = process.env.NEXTAUTH_URL || process.env.NEXT_URL || ''
    const configuredUrl = /localhost|127\.0\.0\.1|::1/i.test(rawUrl) ? '' : rawUrl
    const siteRoot = configuredUrl.replace(/\/allorders\/?$/i, '').replace(/\/$/, '')
    const returnUrl = siteRoot ? `${siteRoot}/allorders` : `https://ecommerce.routemisr.com/allorders`
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        }
    )

    let data = await res.json();
    return data;
}
