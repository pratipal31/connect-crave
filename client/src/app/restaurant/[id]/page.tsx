import { RestaurantMenu } from "@/components/restaurant/restaurant-menu";
import { RestaurantHeader } from "@/components/restaurant/restaurant-header";
import { notFound } from "next/navigation";
export const dynamic = 'force-dynamic';

async function getRestaurant(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/restaurants/${id}`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return null;
  }
}

async function getMenuItems(restaurantId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/restaurants/${restaurantId}/menu`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await getRestaurant(id);

  if (!restaurant) {
    notFound();
  }

  const menuItems = await getMenuItems(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantHeader restaurant={restaurant} />
      <main className="container mx-auto px-4 py-8">
        <RestaurantMenu restaurant={restaurant} menuItems={menuItems} />
      </main>
    </div>
  );
}
