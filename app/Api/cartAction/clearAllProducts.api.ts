'use server'
import getMyToken from "@/app/utilites/getMyToken"



export async function clearAllCart() {

    const token = await getMyToken()
    const tokenStr = token as string
  

    const headers = {
        token : tokenStr,
        'content-type': 'application/json'
    }

    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            method: 'DELETE',
            headers: headers
        }
    )

let data = await res.json();
return data ;
}
