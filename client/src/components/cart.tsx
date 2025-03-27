/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch("/api/cart");
        const cartData = await response.json();
        setCart(cartData.cartItems);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    fetchCart();
  }, []);

  const updateCartItemQuantity = async (
    cartItemId: string,
    newQuantity: number
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        body: JSON.stringify({
          cartItemId,
          quantity: newQuantity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedCart = await response.json();
      setCart(updatedCart.cartItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty</div>
        ) : (
          <>
            {/* Cart Items Grouped by Restaurant */}
            {cart
              .reduce((acc, item) => {
                if (!acc[item.restaurant.id]) {
                  acc[item.restaurant.id] = {
                    restaurant: item.restaurant,
                    items: [],
                  };
                }
                acc[item.restaurant.id].items.push(item);
                return acc;
              }, {})
              .map((group: any) => (
                <div key={group.restaurant.id} className="mb-6 border-b pb-6">
                  <div className="flex items-center mb-4">
                    {group.restaurant.image && (
                      <Image
                        src={group.restaurant.image}
                        alt={group.restaurant.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                    )}
                    <h2 className="text-xl font-semibold">
                      {group.restaurant.name}
                    </h2>
                  </div>

                  {group.items.map((cartItem: any) => (
                    <div
                      key={cartItem.id}
                      className="flex items-center justify-between mb-4 pb-4 border-b"
                    >
                      {cartItem.menuItem.image && (
                        <Image
                          src={cartItem.menuItem.image}
                          alt={cartItem.menuItem.name}
                          width={80}
                          height={80}
                          className="rounded-md mr-4"
                        />
                      )}
                      <div className="flex-grow">
                        <h3 className="font-semibold">
                          {cartItem.menuItem.name}
                        </h3>
                        {cartItem.addOns && cartItem.addOns.length > 0 && (
                          <p className="text-sm text-gray-500">
                            Add-ons: {cartItem.addOns.join(", ")}
                          </p>
                        )}
                        <p className="text-green-600">
                          ₹{cartItem.menuItem.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateCartItemQuantity(
                                cartItem.id,
                                cartItem.quantity - 1
                              )
                            }
                            className="bg-red-500 text-white p-2 rounded-full"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-4 font-bold">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItemQuantity(
                                cartItem.id,
                                cartItem.quantity + 1
                              )
                            }
                            className="bg-green-500 text-white p-2 rounded-full"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-semibold">
                          ₹
                          {(
                            cartItem.menuItem.price * cartItem.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            {/* Cart Summary */}
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Total</h3>
                <span className="text-2xl font-bold text-green-600">
                  ₹{totalCartPrice.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 rounded-md mt-4 hover:bg-blue-600 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
