/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Create or get cart
export async function GET(request: NextRequest) {
  try {
    // For simplicity, we'll use a single cart. In a real app, you'd use user authentication
    let cart = await prisma.cart.findFirst({
      include: {
        cartItems: {
          include: {
            menuItem: true,
            restaurant: true
          }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {},
        include: {
          cartItems: {
            include: {
              menuItem: true,
              restaurant: true
            }
          }
        }
      });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const { menuItemId, restaurantId, quantity, addOns } = await request.json();

    // Find or create cart
    const cart = await prisma.cart.findFirst() ||
      await prisma.cart.create({ data: {} });

    // Check if item already in cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        menuItemId,
        restaurantId
      }
    });

    if (existingCartItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { 
          quantity: existingCartItem.quantity + quantity,
          addOns
        }
      });
    } else {
      // Add new cart item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          menuItemId,
          restaurantId,
          quantity,
          addOns
        }
      });
    }

    // Fetch updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartItems: {
          include: {
            menuItem: true,
            restaurant: true
          }
        }
      }
    });

    return NextResponse.json(updatedCart, { status: 200 });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

// Update cart item
export async function PATCH(request: NextRequest) {
  try {
    const { cartItemId, quantity } = await request.json();

    if (quantity <= 0) {
      // Remove item if quantity is 0
      await prisma.cartItem.delete({
        where: { id: cartItemId }
      });
    } else {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity }
      });
    }

    // Fetch updated cart
    const cart = await prisma.cart.findFirst({
      include: {
        cartItems: {
          include: {
            menuItem: true,
            restaurant: true
          }
        }
      }
    });

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}