import "./globals.css";
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "./_component/navbar/page";
import { Toaster } from "@/components/ui/sonner"
import MySessionProvider from "./_component/MySessionProvider/MySessionProvider";
import type { Metadata } from 'next';
import ScrollToTop from "./_component/scrollToTop/scrollToTop";
import { CartContextProvider } from "./context/cartContext";
import { WishlistContextProvider } from "./context/wishlistContext";


export const metadata: Metadata = {
  title: 'Kareem Store',
  description: '...',
  icons: {
    icon: '/favicon.svg'
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body>

        <MySessionProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <Navbar />
              {children}
            </WishlistContextProvider>
          </CartContextProvider>
          <ScrollToTop />
          <Toaster />
        </MySessionProvider>

      </body>
    </html>
  );
}
