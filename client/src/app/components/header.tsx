import Link from "next/link"
import { Utensils } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              ConnectCrave
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

