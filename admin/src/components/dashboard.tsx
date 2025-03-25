"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import DashboardOverview from "./Dashboard-overview";
import OrderManagement from "./Order-management";
import MenuManagement from "./Menu-management";
import Analytics from "./Analytics";
import Settings from "./Settings";
import { ThemeToggle } from "./Theme-toggle";
import { MenuItemModal } from "./Menu-item-modal";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
};

export type Order = {
  id: string;
  tableNumber: number;
  orderTime: string;
  totalAmount: number;
  orderType: "Delivery" | "Dine-in";
  status: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
  items: { menuItem: MenuItem; quantity: number }[];
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuItemModalOpen, setIsMenuItemModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      category: "Pizza",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "2",
      name: "Chicken Alfredo",
      description: "Creamy pasta with grilled chicken and parmesan",
      price: 15.99,
      category: "Pasta",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "3",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing and croutons",
      price: 8.99,
      category: "Salad",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "4",
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price: 6.99,
      category: "Dessert",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "5",
      name: "Iced Tea",
      description: "Refreshing iced tea with lemon",
      price: 2.99,
      category: "Beverage",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "6",
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: 4.99,
      category: "Appetizer",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      tableNumber: 5,
      orderTime: "2023-04-15T12:30:00",
      totalAmount: 28.97,
      orderType: "Dine-in",
      status: "Delivered",
      items: [
        { menuItem: menuItems[0], quantity: 1 },
        { menuItem: menuItems[4], quantity: 2 },
      ],
    },
    {
      id: "ORD-002",
      tableNumber: 3,
      orderTime: "2023-04-15T12:45:00",
      totalAmount: 15.99,
      orderType: "Dine-in",
      status: "Preparing",
      items: [{ menuItem: menuItems[1], quantity: 1 }],
    },
    {
      id: "ORD-003",
      tableNumber: 0,
      orderTime: "2023-04-15T13:00:00",
      totalAmount: 24.97,
      orderType: "Delivery",
      status: "Pending",
      items: [
        { menuItem: menuItems[2], quantity: 1 },
        { menuItem: menuItems[3], quantity: 1 },
        { menuItem: menuItems[4], quantity: 1 },
      ],
    },
    {
      id: "ORD-004",
      tableNumber: 8,
      orderTime: "2023-04-15T13:15:00",
      totalAmount: 17.98,
      orderType: "Dine-in",
      status: "Ready",
      items: [
        { menuItem: menuItems[5], quantity: 1 },
        { menuItem: menuItems[2], quantity: 1 },
      ],
    },
  ]);

  const addMenuItem = (newItem: Omit<MenuItem, "id">) => {
    const id = (menuItems.length + 1).toString();
    setMenuItems([...menuItems, { ...newItem, id }]);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Simulate real-time order updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomOrderIndex = Math.floor(Math.random() * orders.length);
        const statuses: Order["status"][] = [
          "Pending",
          "Preparing",
          "Ready",
          "Delivered",
        ];
        const currentStatusIndex = statuses.indexOf(
          orders[randomOrderIndex].status
        );
        
        if (currentStatusIndex < statuses.length - 1) {
          updateOrderStatus(
            orders[randomOrderIndex].id,
            statuses[currentStatusIndex + 1]
          );
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [orders]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview orders={orders} />;
      case "orders":
        return (
          <OrderManagement orders={orders} updateOrderStatus={updateOrderStatus} />
        );
      case "menu":
        return (
          <MenuManagement
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            openAddItemModal={() => setIsMenuItemModalOpen(true)}
          />
        );
      case "analytics":
        return <Analytics orders={orders} menuItems={menuItems} />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardOverview orders={orders} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 md:hidden"
      >
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }} />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="text-xl font-semibold md:hidden">
              Restaurant Admin
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="relative">
                <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Menu Item Modal */}
      {isMenuItemModalOpen && (
        <MenuItemModal
          onClose={() => setIsMenuItemModalOpen(false)}
          onSave={addMenuItem}
        />
      )}
    </div>
  );
};

export default Dashboard;
