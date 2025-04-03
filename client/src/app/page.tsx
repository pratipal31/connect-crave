/* eslint-disable @typescript-eslint/no-explicit-any */
import { FoodStallCard } from "@/components/food-stall-card";
export const dynamic = "force-dynamic";

async function fetchRestaurants() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/restaurants`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Popular Food Stalls
        </h2>
        {restaurants.length === 0 ? (
          <p className="text-center text-gray-500">No restaurants found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant: any) => (
              <FoodStallCard
                key={restaurant.id}
                stall={{
                  id: restaurant.id,
                  name: restaurant.name,
                  cuisine: restaurant.tags?.join(", ") || restaurant.cuisine,
                  image: restaurant.image || "/kfc.jpg",
                  rating: restaurant.rating,
                  reviewCount: 0, // No review count in schema
                  isOpen: true, // No isOpen in schema
                  description: restaurant.description, // Added description
                  address: restaurant.address, // Added address
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
