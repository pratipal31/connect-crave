"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type MenuItemProps = {
  item: {
    id: string
    name: string
    description: string
    price: number
    image?: string
    category: string
    isAvailable: boolean
  }
  restaurant: {
    id: string
    name: string
  }
}

// Sample add-ons - in a real app, these would come from the API
const ADDONS = [
  { id: "extra-cheese", name: "Extra Cheese", price: 30 },
  { id: "extra-sauce", name: "Extra Sauce", price: 15 },
  { id: "extra-toppings", name: "Extra Toppings", price: 40 },
  { id: "make-it-spicy", name: "Make it Spicy", price: 10 },
]

export function MenuItem({ item, restaurant }: MenuItemProps) {
  const { cart, addToCart, removeFromCart } = useCart()
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const cartItem = cart.find((cartItem) => cartItem.id === item.id)
  const quantity = cartItem ? cartItem.quantity : 0

  const handleAddToCart = () => {
    if (!item.isAvailable) return

    if (quantity === 0) {
      // First time adding - show add-ons dialog
      setIsDialogOpen(true)
    } else {
      // Already in cart - just increment
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      })
    }
  }

  const handleAddWithAddons = () => {
    // Calculate total price with add-ons
    const addonPrice = selectedAddons.reduce((total, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId)
      return total + (addon?.price || 0)
    }, 0)

    const totalPrice = item.price + addonPrice

    // Add to cart with the total price
    addToCart({
      id: item.id,
      name: item.name,
      price: totalPrice,
      image: item.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    })

    // Reset selected add-ons and close dialog
    setSelectedAddons([])
    setIsDialogOpen(false)
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => (prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]))
  }

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${!item.isAvailable ? "opacity-60" : ""}`}>
      <div className="relative h-48 w-full">
        <Image
          src={item.image || "/placeholder.svg?height=200&width=400"}
          alt={item.name}
          fill
          className="object-cover"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-500 text-sm mt-1 h-12 overflow-hidden">{item.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-primary font-bold">₹{item.price.toFixed(2)}</span>

          {item.isAvailable &&
            (quantity === 0 ? (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddToCart} size="sm">
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Customize Your Order</DialogTitle>
                  </DialogHeader>

                  <div className="py-4">
                    <h4 className="font-medium mb-2">Add-ons</h4>
                    <div className="space-y-3">
                      {ADDONS.map((addon) => (
                        <div key={addon.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddons.includes(addon.id)}
                            onCheckedChange={() => toggleAddon(addon.id)}
                          />
                          <Label htmlFor={addon.id} className="flex-1">
                            {addon.name}
                          </Label>
                          <span className="text-gray-600">+₹{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Base price</p>
                      <p className="font-medium">₹{item.price.toFixed(2)}</p>
                    </div>

                    <Button onClick={handleAddWithAddons}>Add to Cart</Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                  <Minus size={14} />
                </Button>

                <span className="w-6 text-center">{quantity}</span>

                <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleAddToCart}>
                  <Plus size={14} />
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

