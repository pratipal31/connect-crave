"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MenuItem } from "./dashboard";

type MenuManagementProps = {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  openAddItemModal: () => void;
};

const MenuManagement = ({
  menuItems,
  setMenuItems,
  openAddItemModal,
}: MenuManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  // Filter menu items based on search term and category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleItemAvailability = (id: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, available: !selectedItem.available });
    }
  };

  const deleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <div className="mt-3 sm:mt-0">
          <button
            onClick={openAddItemModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Add Menu Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-1">
              Search Menu
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">View Mode</label>
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 px-3 py-2 text-sm font-medium ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex-1 px-3 py-2 text-sm font-medium ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow border ${
                item.available
                  ? "border-gray-200 dark:border-gray-700"
                  : "border-red-300 dark:border-red-700"
              } overflow-hidden`}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                layout="fill"
                objectFit="cover"
              />
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.available
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {item.category}
                </p>
                <p className="text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleItemAvailability(item.id)}
                      className={`p-2 rounded-md ${
                        item.available
                          ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                          : "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                      }`}
                    >
                      {item.available ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md dark:bg-blue-900 dark:text-blue-300"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
              No menu items found matching your filters.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 dark:bg-gray-700">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{item.category}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.available
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {item.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleItemAvailability(item.id)}
                          className={`${
                            item.available
                              ? "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              : "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                          }`}
                        >
                          {item.available ? "Disable" : "Enable"}
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      No menu items found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Menu Item</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={selectedItem.name}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={selectedItem.description}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={selectedItem.category}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedItem.price}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        price: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={selectedItem.image}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        image: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItem.available}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          available: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm">Available</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setMenuItems(
                      menuItems.map((item) =>
                        item.id === selectedItem.id ? selectedItem : item
                      )
                    );
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
