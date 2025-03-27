"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { CartSheet } from "@/components/cart/cart-sheet"
import { useState } from "react"

export function Header() {
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">FoodHub</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/restaurants" className="text-sm font-medium hover:text-primary">
            Restaurants
          </Link>
          <Link href="/orders" className="text-sm font-medium hover:text-primary">
            My Orders
          </Link>
        </nav>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center space-x-2 rounded-full bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          <ShoppingCart size={20} />
          <span className="font-medium">Cart</span>
          {totalItems > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  )
}

