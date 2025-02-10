import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import { WishListProvider } from "@/components/WishList";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Nike Store",
  description: "Nike E-Commerce Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="shortcut icon"
            href="/assets/Nike.png"
            type="image/x-icon"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body>
          <CartProvider>
            <WishListProvider>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <Header />
            
              {children}
              <Toaster/>
              <ToastContainer />
              <Footer />
            </WishListProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
