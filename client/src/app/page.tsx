import { Header } from "../app/components/header"
import { FoodStallCard } from "../app/components/food-stall-card"
import { foodStalls } from "../app/data/food-stalls"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Food Stalls</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodStalls.map((stall) => (
            <FoodStallCard key={stall.id} stall={stall} />
          ))}
        </div>
      </main>
    </div>
  )
}

