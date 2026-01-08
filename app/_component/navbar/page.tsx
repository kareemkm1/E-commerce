'use client'
import { cartItemContext } from "@/app/context/cartContext";
import { wishlistContext } from "@/app/context/wishlistContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react"

export default function Navbar() {

  let { data: session, status } = useSession()
  const [scrolled, setScrolled] = useState(false)

  const cartContext = useContext(cartItemContext)
  const wishlistCtx = useContext(wishlistContext)
  if (!cartContext || !wishlistCtx) { throw new Error('Context not found') }
  const { dataDetails } = cartContext
  const { wishlistCount } = wishlistCtx
  const [openMenu, setOpenMenu] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (status === "loading") return null

  function logOut() {
    signOut({ callbackUrl: '/login' })
  }


  return (
    <header className={`
        sticky top-0 z-50 transition-all duration-500
        ${scrolled
          ? "backdrop-blur-3xl opacity-90 bg-black/80 text-white  shadow-md py-3"
          : "bg-white border-b border-neutral-200 py-6 "}
      `}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between ">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c9a050] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-semibold tracking-tight ">
              Kareem Store<span className="text-[#c9a050]"> .</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link href="/" className="nav-link ">Home</Link>
            </li>
            <li>
              <Link href="/product" className="nav-link ">Shop</Link>
            </li>
            <li>
              <Link href="/brands" className="nav-link ">Brands</Link>
            </li>
            <li>
              <Link href="/categories" className="nav-link ">Categories</Link>
            </li>
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {session ? (
              <>
                {/* User Name */}
                <span className="hidden lg:block text-sm ">
                  Hello, <span className="font-medium ">{session?.user?.name}</span>
                </span>

                {/* Wishlist */}
                <Link href="/wishlist" className="relative p-2 rounded-full  hover:bg-neutral-100" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Orders */}
                <Link href="/allorders" className="p-2 rounded-full  hover:bg-neutral-100" title="My Orders">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </Link>

                {/* Cart */}
                <Link href="/cart" className="relative group">
                  <div className="p-2 rounded-full  hover:bg-neutral-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  {dataDetails !== null && dataDetails > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c9a050] text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {dataDetails}
                    </span>
                  )}
                </Link>

                {/* Logout */}
                <button
                  onClick={() => logOut()}
                  className="hidden md:block text-sm  hover:text-red-700  cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden md:block text-sm  hover:text-green-600 ">
                  Sign In
                </Link>
                <Link href="/signup" className="hidden md:block bg-[#c9a050] hover:bg-[#67490d] btn-primary text-xs px-5 py-2.5">
                  Create Account
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpenMenu(v => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 "
            >
              {openMenu ? (
                <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${openMenu ? 'max-h-96 border-t border-neutral-100 text-black' : 'max-h-0'}
      `}>
        <div className="px-4 py-6 bg-white space-y-1">
          <Link href="/" className="block py-3  font-medium border-b border-neutral-100">
            Home
          </Link>
          <Link href="/product" className="block py-3  font-medium border-b border-neutral-100">
            Shop
          </Link>
          <Link href="/brands" className="block py-3  font-medium border-b border-neutral-100">
            Brands
          </Link>
          <Link href="/categories" className="block py-3  font-medium border-b border-neutral-100">
            Categories
          </Link>

          {session ? (
            <>
              <Link href="/wishlist" className="block py-3  font-medium border-b border-neutral-100">
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link href="/allorders" className="block py-3  font-medium border-b border-neutral-100">
                My Orders
              </Link>
              <Link href="/cart" className="block py-3  font-medium border-b border-neutral-100">
                Cart {dataDetails !== null && dataDetails > 0 && `(${dataDetails})`}
              </Link>
              <button
                onClick={() => logOut()}
                className="block w-full text-left py-3 text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-4 space-y-3">
              <Link href="/login" className="block w-full text-center py-3 border border-neutral-300  font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="block w-full text-center py-3 bg-neutral-900 text-white font-medium">
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
