import { CartProvider } from "@/components/CartContext";
import "@/app/globals.css";

export default function App({ Component, pageProps }: any) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
