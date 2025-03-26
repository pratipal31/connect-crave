"use client";
import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const menuData = {
  name: "Subway",
  description: "Fresh, Healthy, and Delicious! Create your perfect sandwich with Subway's wide range of breads, proteins, veggies, and sauces. Customized nutrition that tastes amazing, made just the way you like it!",
  menu: [
    { id: 1, item: "Chicken Tikka Subway", description: "Tender chicken tikka with fresh vegetables", price: 249, rating: 4.7, veg: false, image: "/subway/chicken-tikka.jpg" },
    { id: 2, item: "Veggie Delite", description: "Fresh vegetables on your choice of bread", price: 159, rating: 4.5, veg: true, image: "/subway/veggie-delite.jpg" },
    { id: 3, item: "Paneer Tikka Subway", description: "Spicy paneer tikka with crunchy veggies", price: 229, rating: 4.6, veg: true, image: "/subway/paneer-tikka.jpg" },
    { id: 4, item: "Chicken Teriyaki", description: "Grilled chicken with sweet teriyaki sauce", price: 279, rating: 4.8, veg: false, image: "/subway/chicken-teriyaki.jpg" },
    { id: 5, item: "Spicy Veggie Patty", description: "Spicy vegetable patty with fresh salad", price: 199, rating: 4.5, veg: true, image: "/subway/spicy-veggie-patty.jpg" },
    { id: 6, item: "Tandoori Chicken", description: "Authentic tandoori style chicken", price: 259, rating: 4.7, veg: false, image: "/subway/tandoori-chicken.jpg" },
    { id: 7, item: "Italian B.M.T.", description: "Classic Italian meats sandwich", price: 299, rating: 4.8, veg: false, image: "/subway/italian-bmt.jpg" },
    { id: 8, item: "Aloo Patty", description: "Crispy potato patty sandwich", price: 179, rating: 4.4, veg: true, image: "/subway/aloo-patty.jpg" },
    { id: 9, item: "Tuna Subway", description: "Fresh tuna with crisp vegetables", price: 269, rating: 4.6, veg: false, image: "/subway/tuna.jpg" },
    { id: 10, item: "Corn & Peas Patty", description: "Healthy vegetable patty sandwich", price: 189, rating: 4.5, veg: true, image: "/subway/corn-peas-patty.jpg" },
    { id: 11, item: "Chicken Ham", description: "Sliced chicken ham sandwich", price: 239, rating: 4.7, veg: false, image: "/subway/chicken-ham.jpg" },
    { id: 12, item: "Veggie Patty", description: "Classic vegetable patty sandwich", price: 209, rating: 4.6, veg: true, image: "/subway/veggie-patty.jpg" },
    { id: 13, item: "Grilled Chicken", description: "Juicy grilled chicken sandwich", price: 269, rating: 4.8, veg: false, image: "/subway/grilled-chicken.jpg" },
    { id: 14, item: "Mint Mojito", description: "Refreshing mint mojito drink", price: 99, rating: 4.5, veg: true, image: "/subway/mint-mojito.jpg" },
    { id: 15, item: "Chocolate Chip Cookie", description: "Freshly baked chocolate chip cookie", price: 49, rating: 4.9, veg: true, image: "/subway/chocolate-cookie.jpg" },
    { id: 16, item: "Cold Coffee", description: "Chilled and creamy coffee", price: 89, rating: 4.6, veg: true, image: "/subway/cold-coffee.jpg" },
    { id: 17, item: "Roasted Chicken", description: "Tender roasted chicken sandwich", price: 249, rating: 4.7, veg: false, image: "/subway/roasted-chicken.jpg" },
    { id: 18, item: "Mediterranean Veggie", description: "Mediterranean style vegetable sandwich", price: 219, rating: 4.6, veg: true, image: "/subway/mediterranean-veggie.jpg" },
    { id: 19, item: "Southwest Chicken", description: "Spicy southwest style chicken", price: 279, rating: 4.8, veg: false, image: "/subway/southwest-chicken.jpg" },
    { id: 20, item: "Strawberry Milkshake", description: "Creamy strawberry milkshake", price: 109, rating: 4.7, veg: true, image: "/subway/strawberry-shake.jpg" },
    { id: 21, item: "Malai Wrap", description: "Creamy paneer wrap", price: 199, rating: 4.5, veg: true, image: "/subway/malai-wrap.jpg" },
    { id: 22, item: "Falafel", description: "Middle Eastern style falafel sandwich", price: 229, rating: 4.6, veg: true, image: "/subway/falafel.jpg" },
    { id: 23, item: "BBQ Chicken", description: "BBQ flavored chicken sandwich", price: 259, rating: 4.7, veg: false, image: "/subway/bbq-chicken.jpg" },
    { id: 24, item: "Oreo Shake", description: "Creamy Oreo milkshake", price: 119, rating: 4.8, veg: true, image: "/subway/oreo-shake.jpg" },
    { id: 25, item: "Cheese & Corn Patty", description: "Cheesy corn vegetable patty", price: 209, rating: 4.5, veg: true, image: "/subway/cheese-corn-patty.jpg" },
    { id: 26, item: "Mango Smoothie", description: "Fresh mango smoothie", price: 99, rating: 4.6, veg: true, image: "/subway/mango-smoothie.jpg" },
    { id: 27, item: "Club Sandwich", description: "Classic multi-layer sandwich", price: 249, rating: 4.7, veg: false, image: "/subway/club-sandwich.jpg" },
    { id: 28, item: "Chatpata Aloo Patty", description: "Spicy potato patty sandwich", price: 189, rating: 4.5, veg: true, image: "/subway/chatpata-aloo-patty.jpg" },
    { id: 29, item: "Coke", description: "Chilled Coca-Cola", price: 49, rating: 4.4, veg: true, image: "/subway/coke.jpg" },
    { id: 30, item: "Salad Bowl", description: "Fresh mixed vegetable salad", price: 179, rating: 4.6, veg: true, image: "/subway/salad-bowl.jpg" }
  ]
};

export default function SubwayMenuPage() {
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
    <div className="min-h-screen bg-green-50 p-6">
      {/* Header */}
      <div className="bg-white shadow-lg rounded-xl mb-8 overflow-hidden">
        <div className="flex items-center bg-green-600 p-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mr-6 shadow-lg">
            <img 
              src="/subway.jpg" 
              alt="Subway Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Subway</h1>
            <p className="text-white text-lg opacity-90">Eat Fresh</p>
          </div>
        </div>
        <div className="p-6 bg-green-50">
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
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-all"
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