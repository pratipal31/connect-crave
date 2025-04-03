"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Order, MenuItem } from "../components/dashboard";
import Image from "next/image";

type AnalyticsProps = {
  orders: Order[];
  menuItems: MenuItem[];
};

const Analytics = ({ orders, menuItems }: AnalyticsProps) => {
  const [dateRange, setDateRange] = useState("week");

  // Calculate metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const averageOrderValue = totalRevenue / totalOrders || 0;

  // Calculate most popular items
  const itemCounts: Record<string, { count: number; revenue: number }> = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const id = item.menuItem.id;
      if (!itemCounts[id]) {
        itemCounts[id] = { count: 0, revenue: 0 };
      }
      itemCounts[id].count += item.quantity;
      itemCounts[id].revenue += item.quantity * item.menuItem.price;
    });
  });

  const popularItems = Object.entries(itemCounts)
    .map(([id, { count, revenue }]) => ({
      item: menuItems.find((item) => item.id === id)!,
      count,
      revenue,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Calculate order status distribution
  const statusCounts: Record<string, number> = {};
  orders.forEach((order) => {
    if (!statusCounts[order.status]) {
      statusCounts[order.status] = 0;
    }
    statusCounts[order.status]++;
  });

  // Calculate order type distribution
  const typeCounts: Record<string, number> = {};
  orders.forEach((order) => {
    if (!typeCounts[order.orderType]) {
      typeCounts[order.orderType] = 0;
    }
    typeCounts[order.orderType]++;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Analytics & Insights</h1>
        <div className="mt-3 sm:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">{totalOrders}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {dateRange === "today"
              ? "Today"
              : dateRange === "week"
              ? "This Week"
              : dateRange === "month"
              ? "This Month"
              : "This Year"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {dateRange === "today"
              ? "Today"
              : dateRange === "week"
              ? "This Week"
              : dateRange === "month"
              ? "This Month"
              : "This Year"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-2">Average Order Value</h2>
          <p className="text-3xl font-bold">${averageOrderValue.toFixed(2)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {dateRange === "today"
              ? "Today"
              : dateRange === "week"
              ? "This Week"
              : dateRange === "month"
              ? "This Month"
              : "This Year"}
          </p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart (Placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Revenue chart visualization would go here
            </p>
          </div>
        </motion.div>

        {/* Order Status Distribution Chart (Placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-4">
            Order Status Distribution
          </h2>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Status distribution chart would go here
            </p>
          </div>
        </motion.div>
      </div>

      {/* Popular Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Most Popular Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Quantity Sold
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {popularItems.map(({ item, count, revenue }) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-750"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 dark:bg-gray-700">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.category}</td>
                  <td className="px-4 py-3 text-sm font-medium">{count}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    ${revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
              {popularItems.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No data available for the selected time period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Order Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-4">
            Order Type Distribution
          </h2>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Order type distribution chart would go here
            </p>
          </div>
        </motion.div>

        {/* Peak Hours Chart (Placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold mb-4">Peak Ordering Hours</h2>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Peak hours chart visualization would go here
            </p>
          </div>
        </motion.div>
      </div>

      {/* Export Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold mb-4">Export Data</h2>
        <div className="flex flex-wrap gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Export as CSV
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Export as Excel
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Export as PDF
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
