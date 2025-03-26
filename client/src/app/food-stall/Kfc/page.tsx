"use client";
import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const menuData = {
  name: "KFC India",
  description: "Finger-Lickin' Good! Experience the ultimate chicken feast with KFC's legendary recipes. From crispy fried chicken to innovative burgers and combos, we bring you delicious meals that satisfy every craving!",
  menu: [
    { id: 1, item: "Chicken Zinger Burger", description: "Spicy chicken fillet burger", price: 199, rating: 4.7, veg: false, image: "/kfc/zinger-burger.jpg" },
    { id: 2, item: "Paneer Zinger Burger", description: "Crispy paneer patty burger", price: 179, rating: 4.5, veg: true, image: "/kfc/paneer-zinger.jpg" },
    { id: 3, item: "Chicken Bucket (8 pcs)", description: "Classic KFC fried chicken bucket", price: 899, rating: 4.9, veg: false, image: "/kfc/chicken-bucket.jpg" },
    { id: 4, item: "Popcorn Chicken", description: "Bite-sized crispy chicken pieces", price: 159, rating: 4.8, veg: false, image: "/kfc/popcorn-chicken.jpg" },
    { id: 5, item: "Veggie Zinger", description: "Crispy vegetable patty burger", price: 159, rating: 4.4, veg: true, image: "/kfc/veggie-zinger.jpg" },
    { id: 6, item: "Chicken Wings", description: "Spicy and crispy chicken wings", price: 299, rating: 4.7, veg: false, image: "/kfc/chicken-wings.jpg" },
    { id: 7, item: "Classic Chicken Sandwich", description: "Soft bun with crispy chicken", price: 229, rating: 4.6, veg: false, image: "/kfc/classic-chicken-sandwich.jpg" },
    { id: 8, item: "Veg Longer", description: "Long vegetable patty burger", price: 189, rating: 4.5, veg: true, image: "/kfc/veg-longer.jpg" },
    { id: 9, item: "Tandoori Chicken", description: "Spicy tandoori style chicken", price: 349, rating: 4.8, veg: false, image: "/kfc/tandoori-chicken.jpg" },
    { id: 10, item: "Chizza", description: "Chicken pizza with crispy base", price: 349, rating: 4.7, veg: false, image: "/kfc/chizza.jpg" },
    { id: 11, item: "Veggie Strips", description: "Crispy vegetable strips", price: 139, rating: 4.4, veg: true, image: "/kfc/veggie-strips.jpg" },
    { id: 12, item: "Hot Wings", description: "Extra spicy chicken wings", price: 259, rating: 4.6, veg: false, image: "/kfc/hot-wings.jpg" },
    { id: 13, item: "Veg Duo Burger", description: "Double vegetable patty burger", price: