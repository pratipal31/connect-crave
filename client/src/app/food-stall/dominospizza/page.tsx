"use client";
import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const menuData = {
  name: "Domino's Pizza",
  description: "Indulge in the ultimate pizza experience! From classic favorites to innovative creations, Domino's offers a wide range of delicious pizzas, sides, and desserts. Fresh ingredients, perfect toppings, and hot-from-the-oven goodness await!",
  menu: [
    { id: 1, item: "Margherita Pizza", description: "Classic pizza with tomato sauce and mozzarella", price: 199, rating: 4.7, veg: true, image: "/dominos/margherita.jpg" },
    { id: 2, item: "Pepperoni Passion", description: "Loaded with spicy pepperoni and cheese", price: 349, rating: 4.8, veg: false, image: "/dominos/pepperoni.jpg" },
    { id: 3, item: "Veggie Paradise", description: "Garden-fresh vegetables on a cheesy base", price: 279, rating: 4.6, veg: true, image: "/dominos/veggie-paradise.jpg" },
    { id: 4, item: "Chicken Maximus", description: "Loaded with grilled chicken and spices", price: 399, rating: 4.9, veg: false, image: "/dominos/chicken-maximus.jpg" },
    { id: 5, item: "Cheese Burst Pizza", description: "Extra cheese in every bite", price: 329, rating: 4.7, veg: true, image: "/dominos/cheese-burst.jpg" },
    { id: 6, item: "Tandoori Chicken Pizza", description: "Spicy tandoori chicken with onions", price: 379, rating: 4.8, veg: false, image: "/dominos/tandoori-chicken.jpg" },
    { id: 7, item: "Garlic Bread", description: "Soft bread with garlic butter", price: 99, rating: 4.5, veg: true, image: "/dominos/garlic-bread.jpg" },
    { id: 8, item: "Chicken Wings", description: "Crispy spiced chicken wings", price: 229, rating: 4.6, veg: false, image: "/dominos/chicken-wings.jpg" },
    { id: 9, item: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", price: 99, rating: 4.9, veg: true, image: "/dominos/lava-cake.jpg" },
    { id: 10, item: "Paneer Makhani Pizza", description: "Rich paneer with creamy makhani sauce", price: 349, rating: 4.7, veg: true, image: "/dominos/paneer-makhani.jpg" },
    { id: 11, item: "BBQ Chicken Pizza", description: "Smoky BBQ chicken with bell peppers", price: 389, rating: 4.8, veg: false, image: "/dominos/bbq-chicken.jpg" },
    { id: 12, item: "Corn & Cheese Pizza", description: "Sweet corn and melted cheese", price: 249, rating: 4.5, veg: true, image: "/dominos/corn-cheese.jpg" },
    { id: 13, item: "Stuffed Garlic Bread", description: "Bread stuffed with cheese and herbs", price: 139, rating: 4.6, veg: true, image: "/dominos/stuffed-garlic-bread.jpg" },
    { id: 14, item: "Chicken Sausage Pizza", description: "Spicy chicken sausage toppings", price: 369, rating: 4.7, veg: false, image: "/dominos/chicken-sausage.jpg" },
    { id: 15, item: "Hawaiian Pizza", description: "Tropical ham and pineapple", price: 329, rating: 4.4, veg: false, image: "/dominos/hawaiian.jpg" },
    { id: 16, item: "Pasta Italiano", description: "Creamy Italian style pasta", price: 199, rating: 4.5, veg: true, image: "/dominos/pasta.jpg" },
    { id: 17, item: "Mexican Green Wave", description: "Spicy Mexican green pizza", price: 299, rating: 4.6, veg: true, image: "/dominos/mexican-green-wave.jpg" },
    { id: 18, item: "Loaded Potato Wedges", description: "Crispy potato wedges with toppings", price: 149, rating: 4.7, veg: true, image: "/dominos/potato-wedges.jpg" },
    { id: 19, item: "Chicken Golden Delight", description: "Premium chicken pizza", price: 419, rating: 4.8, veg: false, image: "/dominos/golden-delight.jpg" },
    { id: 20, item: "Oreo Chocolate Shake", description: "Creamy Oreo chocolate milkshake", price: 129, rating: 4.9, veg: true, image: "/dominos/oreo-shake.jpg" },
    { id: 21, item: "Peppy Paneer Pizza", description: "Spicy paneer chunks pizza", price: 329, rating: 4.6, veg: true, image: "/dominos/peppy-paneer.jpg" },
    { id: 22, item: "Cheese Dip", description: "Creamy cheese dipping sauce", price: 59, rating: 4.5, veg: true, image: "/dominos/cheese-dip.jpg" },
    { id: 23, item: "Mediterranean Veggie Pizza", description: "Mediterranean vegetable toppings", price: 299, rating: 4.7, veg: true, image: "/dominos/mediterranean-veggie.jpg" },
    { id: 24, item: "Chicken Dominator", description: "Ultimate chicken loaded pizza", price: 449, rating: 4.9, veg: false, image: "/dominos/chicken-dominator.jpg" },
    { id: 25, item: "Choco Lava Cake (2 Pcs)", description: "Two warm chocolate lava cakes", price: 169, rating: 4.8, veg: true, image: "/dominos/choco-lava-2pcs.jpg" },
    { id: 26, item: "Farmhouse Pizza", description: "Mix of farm-fresh vegetables", price: 349, rating: 4.6, veg: true, image: "/dominos/farmhouse.jpg" },
    { id: 27, item: "Cold Coffee", description: "Chilled and creamy coffee", price: 109, rating: 4.5, veg: true, image: "/dominos/cold-coffee.jpg" },
    { id: 28, item: "Chicken Fiesta Pizza", description: "Spicy chicken and bell peppers", price: 389, rating: 4.7, veg: false, image: "/dominos/chicken-fiesta.jpg" },
    { id: 29, item: "Cheesy Dip", description: "Extra cheesy dipping sauce", price: 69, rating: 4.6, veg: true, image: "/dominos/cheesy-dip.jpg" },
    { id: 30, item: "Veggie Extravaganza", description: "Ultimate vegetable loaded pizza", price: 379, rating: 4.8, veg: true, image: "/dominos/veggie-extravaganza.jpg" }
  ]
};

export default function DominosPizzaMenuPage() {
  const [cart, setCart] = useState<{ item: string; price: number; quantity: number }[]>([]);

  const addToCart = (item: string, price: number) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.item === item);
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { item, price, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: string) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.item === item);
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  return (
    <div className="min-h-screen bg-red-50 p-6">
      {/* Header */}
      <div className="bg-white shadow-lg rounded-xl mb-8 overflow-hidden">
        <div className="flex items-center bg-blue-600 p-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mr-6 shadow-lg">
            <img 
              src="/dominos.png" 
              alt="Domino's Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Domino's Pizza</h1>
            <p className="text-white text-lg opacity-90">Taste the Moment</p>
          </div>
        </div>
        <div className="p-6 bg-red-50">
          <p className="text-gray-700 max-w-4xl mx-auto text-center text-lg leading-relaxed">
            {menuData.description}
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {menuData.menu.map((item) => {
          const cartItem = cart.find(cartItem => cartItem.item === item.item);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.item} 
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.item}</h3>
                <p className="text-gray-500 mb-2 h-12">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-600 font-bold text-lg">₹{item.price}</span>
                  <span className="text-yellow-500 font-semibold">⭐ {item.rating}</span>
                </div>
                
                {/* Veg/Non-Veg Tag */}
                <div className="mb-4">
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      item.veg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                </div>
                
                {/* Add/Remove Buttons */}
                <div className="flex items-center justify-between">
                  {quantity === 0 ? (
                    <button 
                      onClick={() => addToCart(item.item, item.price)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-all"
                    >
                      Add to Order
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 w-full">
                      <button 
                        onClick={() => removeFromCart(item.item)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="flex-grow text-center font-bold">{quantity}</span>
                      <button 
                        onClick={() => addToCart(item.item, item.price)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 bg-yellow-500 p-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-yellow-600 transition-all">
          <ShoppingCart size={24} className="text-white" />
          <span className="text-white font-bold">{totalItems} Items</span>
          <span className="text-white font-semibold">₹{totalPrice.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}