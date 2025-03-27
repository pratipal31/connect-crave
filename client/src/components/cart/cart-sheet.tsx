"use client"

import { useCart } from "./cart-provider"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useState } from "react"

type CartSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)

    try {
      // Here you would typically send the cart to your API
      // to create an order in the database
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      })

      if (response.ok) {
        clearCart()
        onOpenChange(false)
        router.push("/checkout/success")
      } else {
        console.error("Failed to create order")
      }
    } catch (error) {
      console.error("Error during checkout:", error)
    } finally {
      setIsCheckingOut(false)
    }
  }

  // Group cart items by restaurant
  const itemsByRestaurant = cart.reduce(
    (acc, item) => {
      if (!acc[item.restaurantId]) {
        acc[item.restaurantId] = {
          restaurantName: item.restaurantName,
          items: [],
        }
      }
      acc[item.restaurantId].items.push(item)
      return acc
    },
    {} as Record<string, { restaurantName: string; items: typeof cart }>,
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Your cart is empty</h3>
            <p className="text-gray-500 mt-2 text-center">Add items from restaurants to get started</p>
            <Button
              className="mt-6"
              onClick={() => {
                onOpenChange(false)
                router.push("/")
              }}
            >
              Browse Restaurants
            </Button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
            <div className="flex-1 overflow-y-auto pr-2">
              {Object.entries(itemsByRestaurant).map(([restaurantId, { restaurantName, items }]) => (
                <div key={restaurantId} className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">{restaurantName}</h3>

                  {items.map((item) => (
                    <div key={item.id} className="flex items-center py-3 border-b">
                      <div className="h-16 w-16 relative rounded-md overflow-hidden mr-3">
                        <Image
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus size={14} />
                        </Button>

                        <span className="w-6 text-center">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t sticky bottom-0 bg-white">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">₹40.00</span>
              </div>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">₹{(totalPrice * 0.05).toFixed(2)}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between mb-4">
                <span className="font-bold">Total</span>
                <span className="font-bold">₹{(totalPrice + 40 + totalPrice * 0.05).toFixed(2)}</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={() => clearCart()}>
                  <Trash2 size={16} className="mr-2" />
                  Clear Cart
                </Button>

                <Button className="flex-1" onClick={handleCheckout} disabled={isCheckingOut}>
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

