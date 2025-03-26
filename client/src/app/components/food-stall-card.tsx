"use client";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export interface FoodStall {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  distance?: string;
}

interface FoodStallCardProps {
  stall?: FoodStall;
}

export function FoodStallCard({ stall }: FoodStallCardProps) {
  const router = useRouter();

  const defaultStall: FoodStall = {
    id: 0,
    name: "Food Stall",
    cuisine: "Various",
    image: "/placeholder.svg",
    rating: 0,
    reviewCount: 0,
    isOpen: false,
  };

  const foodStall = stall || defaultStall;

  const handleClick = () => {
    if (foodStall.id > 0) {
      router.push(`/food-stall/${foodStall.name.toLowerCase().replace(/\s+/g, "").replace(/'/g, "")}`);
    }
  };
  

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group cursor-pointer" onClick={handleClick}>
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={foodStall.image || "/placeholder.svg"}
          alt={foodStall.name}
          width={600}
          height={500}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors">{foodStall.name}</h3>
        <p className="text-sm text-gray-500 mb-3 flex items-center">
          <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs mr-2">{foodStall.cuisine}</span>
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <div className="bg-yellow-50 p-1 rounded-full mr-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-sm font-medium">{foodStall.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({foodStall.reviewCount})</span>
          </div>
          {foodStall.distance && (
            <div className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              {foodStall.distance}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
