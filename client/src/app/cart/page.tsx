"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {cart.map((item) => (
              <div
                key={item.id} // Changed from menuItemId to id based on your CartItem type
                className="flex items-center justify-between bg-white shadow rounded-lg p-4 mb-4"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={
                      () => updateQuantity(item.id, item.quantity - 1) // Changed from menuItemId to id
                    }
                    disabled={item.quantity <= 1}
                    className="bg-gray-200 p-2 rounded-full disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={
                      () => updateQuantity(item.id, item.quantity + 1) // Changed from menuItemId to id
                    }
                    className="bg-gray-200 p-2 rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)} // Changed from menuItemId to id
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Price</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
