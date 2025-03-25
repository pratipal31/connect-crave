"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Order } from "./dashboard"

type OrderManagementProps = {
  orders: Order[]
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
}

const OrderManagement = ({ orders, updateOrderStatus }: OrderManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "All">("All")
  const [typeFilter, setTypeFilter] = useState<Order["orderType"] | "All">("All")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Filter orders based on search term and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    const matchesType = typeFilter === "All" || order.orderType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus)
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="mt-3 sm:mt-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            New Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-1">
              Search Orders
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by order ID or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Order["status"] | "All")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Order Type
            </label>
            <select
              id="type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as Order["orderType"] | "All")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Dine-in">Dine-in</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
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
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-sm">
                    {order.orderType === "Delivery" ? "Delivery" : `Table ${order.tableNumber}`}
                  </td>
                  <td className="px-4 py-3 text-sm">{new Date(order.orderTime).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{order.orderType}</td>
                  <td className="px-4 py-3 text-sm">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : order.status === "Preparing"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : order.status === "Ready"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : order.status === "Delivered"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedOrder(order)
                        }}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </button>
                      {order.status !== "Delivered" && order.status !== "Cancelled" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            const nextStatus: Record<Order["status"], Order["status"]> = {
                              Pending: "Preparing",
                              Preparing: "Ready",
                              Ready: "Delivered",
                              Delivered: "Delivered",
                              Cancelled: "Cancelled",
                            }
                            handleStatusChange(order.id, nextStatus[order.status])
                          }}
                          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No orders found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Order {selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Order Type</p>
                  <p className="font-medium">{selectedOrder.orderType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Table Number</p>
                  <p className="font-medium">
                    {selectedOrder.orderType === "Delivery" ? "N/A" : selectedOrder.tableNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Order Time</p>
                  <p className="font-medium">{new Date(selectedOrder.orderTime).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p
                    className={`font-medium ${
                      selectedOrder.status === "Pending"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : selectedOrder.status === "Preparing"
                          ? "text-blue-600 dark:text-blue-400"
                          : selectedOrder.status === "Ready"
                            ? "text-purple-600 dark:text-purple-400"
                            : selectedOrder.status === "Delivered"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {selectedOrder.status}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 border-b last:border-b-0 border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                          <span className="text-xs font-semibold">{item.quantity}x</span>
                        </div>
                        <div>
                          <p className="font-medium">{item.menuItem.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.menuItem.category}</p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.menuItem.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center font-semibold text-lg mb-4">
                <p>Total</p>
                <p>${selectedOrder.totalAmount.toFixed(2)}</p>
              </div>

              {selectedOrder.status !== "Delivered" && selectedOrder.status !== "Cancelled" && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.status !== "Pending" && (
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, "Pending")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Pending
                      </button>
                    )}
                    {selectedOrder.status !== "Preparing" && (
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, "Preparing")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Preparing
                      </button>
                    )}
                    {selectedOrder.status !== "Ready" && (
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, "Ready")}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Ready
                      </button>
                    )}
                    {selectedOrder.status !== "Delivered" && (
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, "Delivered")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Delivered
                      </button>
                    )}
                    {selectedOrder.status !== "Cancelled" && (
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, "Cancelled")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement

