import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

type FoodStallCardProps = {
  stall: {
    id: string;
    name: string;
    cuisine: string;
    image: string;
    rating: number;
    reviewCount: number;
    isOpen: boolean;
    description: string;
    address: string;
  };
};

export function FoodStallCard({ stall }: FoodStallCardProps) {
  return (
    <Link href={`/restaurant/${stall.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={stall.image || "/placeholder.svg"}
            alt={stall.name}
            fill
            className="object-cover"
          />
          {!stall.isOpen && (
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Closed
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{stall.name}</h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center bg-green-50 text-green-700 rounded px-2 py-0.5 text-sm">
              <Star className="h-3.5 w-3.5 mr-1 fill-current" />
              <span>{stall.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-500 text-sm">{stall.cuisine}</span>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2">
            {stall.description}
          </p>

          <div className="mt-2 text-xs text-gray-500">{stall.address}</div>
        </div>
      </div>
    </Link>
  );
}
