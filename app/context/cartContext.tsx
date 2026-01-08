'use client'
import { createContext, useEffect, useState } from "react";
import { getLoggedUserCart } from "../Api/cartAction/getLoggedUserCart.api";
import type { Root } from "../interface/cart.interface";

type CartContextType = {
    dataDetails: number | null
    setDetails: React.Dispatch<React.SetStateAction<number | null>>
}

export const cartItemContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: { children: React.ReactNode }) {

    const [dataDetails, setDetails] = useState<number | null>(null)

    async function getDetails() {
        try {
            const resp = await getLoggedUserCart() as Root
            setDetails(resp?.numOfCartItems ?? null)
        } catch (err) {
            setDetails(null)
        }
    }

    useEffect(() => {
        getDetails()
    }, [])

    return (
        <cartItemContext.Provider value={{ dataDetails, setDetails }}>
            {children}
        </cartItemContext.Provider>
    )

}