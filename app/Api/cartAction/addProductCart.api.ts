'use server'
import getMyToken from "@/app/utilites/getMyToken"



export async function AddToCart(id: string) {

    const token = await getMyToken()
    const tokenStr = token as string
    const payload = {
        "productId": id
    }

    const headers = {
        token:tokenStr,
        'content-type': 'application/json'
    }

    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        }
    )

let data = await res.json();
return data ;
}
        