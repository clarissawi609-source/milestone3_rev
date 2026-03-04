"use client";

import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/store/cartStore";
import Footer from "@/components/footer";
// import { CartContext } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();

  // const cartContext = useContext(CartContext);
  // if (!cartContext) return null;

  // CONTOH PEMBELAJARAN CONTEXT API - CART PAGE
  // const { cart, removeFromCart, updateQuantity } = cartContext;
  // const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-lg md:max-w-xl lg:max-w-4xl m-auto flex flex-col items-center h-screen">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-xl font-bold">Cart is empty</h1>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg md:max-w-xl lg:max-w-4xl m-auto flex flex-col items-center h-screen">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* LEFT - ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>

                    <span>{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="border rounded-lg p-6 h-fit">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <p className="mb-4">
                Total: <span className="font-bold">${totalPrice}</span>
              </p>

              <Button
                className="w-full"
                onClick={() => router.push("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}