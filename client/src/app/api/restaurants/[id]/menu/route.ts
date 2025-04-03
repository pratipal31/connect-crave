import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurantId: id,
      },
      orderBy: {
        category: "asc",
      },
    })

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}