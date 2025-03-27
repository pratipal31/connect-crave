"use client"

import { useState } from "react"
import { MenuItem } from "@/components/restaurant/menu-item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type MenuItemType = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  isAvailable: boolean
}

type RestaurantMenuProps = {
  restaurant: {
    id: string
    name: string
  }
  menuItems: MenuItemType[]
}

export function RestaurantMenu({ restaurant, menuItems }: RestaurantMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  // Group menu items by category
  const categories = ["all", ...new Set(menuItems.map((item) => item.category))]

  const filteredItems =
    activeCategory === "all" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>

      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="mb-6 flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuItem key={item.id} item={item} restaurant={restaurant} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

