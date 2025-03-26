"use client";
import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const menuData = {
  name: "McDonald's India",
  description: "Discover a world of delicious flavors! From classic burgers to innovative vegetarian options, McDonald's India offers something for everyone. Enjoy quality ingredients, amazing taste, and unbeatable value!",
  menu: [
    { id: 1, item: "Maharaja Mac", description: "Double-decker chicken burger with special sauce", price: 269, rating: 4.7, veg: false, image: "/maharaja.png" },
    { id: 2, item: "McAloo Tikki", description: "Crispy potato patty with fresh vegetables", price: 55, rating: 4.5, veg: true, image: "/aloo-tikki.png" },
    { id: 3, item: "Chicken Maharaja Mac", description: "Premium chicken burger with chipotle sauce", price: 299, rating: 4.8, veg: false, image: "/chicken-burger.png" },
    { id: 4, item: "McVeggie", description: "Spicy vegetable patty with cheese", price: 129, rating: 4.6, veg: true, image: "/mcveggie.png" },
    { id: 5, item: "Paneer Wrap", description: "Soft wrap with crispy paneer patty", price: 159, rating: 4.4, veg: true, image: "/paneer-wrap.png" },
    { id: 6, item: "Chicken Kebab Burger", description: "Grilled chicken kebab in a soft bun", price: 189, rating: 4.6, veg: false, image: "/chicken-kebab.jpeg" },
    { id: 7, item: "Veg Maharaja Mac", description: "Double-decker vegetarian burger", price: 229, rating: 4.5, veg: true, image: "/veg-maharaja.png" },
    { id: 8, item: "Chicken Nuggets", description: "Crispy bite-sized chicken pieces", price: 139, rating: 4.7, veg: false, image: "/chicken-nuggets.jpg" },
    { id: 9, item: "Potato Wedges", description: "Crispy spiced potato wedges", price: 109, rating: 4.6, veg: true, image: "/mcdonalds/potato-wedges.jpg" },
    { id: 10, item: "Masala Chai", description: "Authentic Indian spiced tea", price: 49, rating: 4.5, veg: true, image: "/mcdonalds/masala-chai.jpg" },
    { id: 11, item: "Cheesy Fries", description: "Golden fries topped with cheese sauce", price: 129, rating: 4.8, veg: true, image: "/mcdonalds/cheesy-fries.jpg" },
    { id: 12, item: "McChicken Burger", description: "Crispy chicken patty with mayo", price: 149, rating: 4.6, veg: false, image: "/mcdonalds/mcchicken.jpg" },
    { id: 13, item: "Veggie Burger", description: "Classic vegetable patty burger", price: 99, rating: 4.3, veg: true, image: "/mcdonalds/veggie-burger.jpg" },
    { id: 14, item: "Chicken Tikka Burger", description: "Spicy tikka-style chicken burger", price: 179, rating: 4.7, veg: false, image: "/mcdonalds/chicken-tikka.jpg" },
    { id: 15, item: "McSpicy Paneer", description: "Spicy paneer patty with special sauce", price: 169, rating: 4.5, veg: true, image: "/mcdonalds/mcspicy-paneer.jpg" },
    { id: 16, item: "Cold Coffee", description: "Chilled and creamy coffee", price: 89, rating: 4.6, veg: true, image: "/mcdonalds/cold-coffee.jpg" },
    { id: 17, item: "Chocolate Shake", description: "Rich and creamy chocolate milkshake", price: 129, rating: 4.7, veg: true, image: "/mcdonalds/chocolate-shake.jpg" },
    { id: 18, item: "Grilled Chicken Burger", description: "Juicy grilled chicken burger", price: 199, rating: 4.8, veg: false, image: "/mcdonalds/grilled-chicken.jpg" },
    { id: 19, item: "Veggie Pizza McPuff", description: "Crispy pizza-style pastry", price: 79, rating: 4.4, veg: true, image: "/mcdonalds/pizza-mcpuff.jpg" },
    { id: 20, item: "Masala Dosa", description: "McDonald's take on the classic South Indian dish", price: 149, rating: 4.5, veg: true, image: "/mcdonalds/masala-dosa.jpg" },
    { id: 21, item: "Chicken Salad", description: "Fresh chicken salad with crisp vegetables", price: 179, rating: 4.6, veg: false, image: "/mcdonalds/chicken-salad.jpg" },
    { id: 22, item: "Aloo Tikki Burger", description: "Crispy potato patty burger", price: 69, rating: 4.3, veg: true, image: "/mcdonalds/aloo-tikki-burger.jpg" },
    { id: 23, item: "Egg Burger", description: "Soft bun with egg patty", price: 89, rating: 4.4, veg: false, image: "/mcdonalds/egg-burger.jpg" },
    { id: 24, item: "Strawberry Shake", description: "Creamy strawberry milkshake", price: 119, rating: 4.5, veg: true, image: "/mcdonalds/strawberry-shake.jpg" },
    { id: 25, item: "Chicken Wings", description: "Crispy spiced chicken wings", price: 169, rating: 4.7, veg: false, image: "/mcdonalds/chicken-wings.jpg" },
    { id: 26, item: "Tandoori Paneer Burger", description: "Spicy tandoori-style paneer burger", price: 189, rating: 4.6, veg: true, image: "/mcdonalds/tandoori-paneer.jpg" },
    { id: 27, item: "Mango Smoothie", description: "Refreshing mango smoothie", price: 109, rating: 4.5, veg: true, image: "/mcdonalds/mango-smoothie.jpg" },
    { id: 28, item: "Fish Burger", description: "Crispy fish patty burger", price: 199, rating: 4.6, veg: false, image: "/mcdonalds/fish-burger.jpg" },
  ]
};

export default function McDonaldsMenuPage() {
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
        <div className="flex items-center bg-red-600 p-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mr-6 shadow-lg">
            <img
              src="/mcd.png"
              height={100} 
              alt="McDonald's Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">McDonald's India</h1>
            <p className="text-white text-lg opacity-90">Taste That Connects</p>
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
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-all"
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