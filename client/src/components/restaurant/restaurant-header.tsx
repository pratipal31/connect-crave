import Image from "next/image"

type RestaurantHeaderProps = {
  restaurant: {
    id: string
    name: string
    description: string
    image?: string
    cuisine: string
    tags?: string[]
    rating: number
    address: string
  }
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  return (
    <div className="bg-white shadow-lg rounded-b-xl mb-8 overflow-hidden">
      <div className="relative h-48 md:h-64 w-full">
        <Image
          src={restaurant.image || "/placeholder.svg?height=300&width=1200"}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <span>{restaurant.cuisine}</span>
            <span>⭐ {restaurant.rating.toFixed(1)}</span>
            <span>{restaurant.address}</span>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white">
        <p className="text-gray-700 max-w-4xl text-lg leading-relaxed">{restaurant.description}</p>
        {restaurant.tags && restaurant.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {restaurant.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

