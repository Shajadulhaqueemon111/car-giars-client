"use client";

import PyChart from "./pychart";
import { useEffect, useState } from "react";
import nexiosInstance from "@/config/nexious.config";
import { User, ShoppingCart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  img?: string;
  location?: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await nexiosInstance.get<ApiResponse<User[]>>(
          "/users"
        );
        if (response.data && Array.isArray(response.data?.data)) {
          setUsers(response?.data?.data);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="stat shadow-md bg-white p-6 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <User className="w-10 h-10 text-blue-500" />
            <h2 className="text-lg font-semibold">Total Users</h2>
          </div>
          <p className="text-4xl font-bold text-blue-600 mt-3">
            {users?.length}
          </p>
          <p className="text-gray-500">Updated just now</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="stat shadow-md bg-white p-6 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-10 h-10 text-green-500" />
            <h2 className="text-lg font-semibold">Total Sales</h2>
          </div>
          <p className="text-4xl font-bold text-green-600 mt-3">$2.6M</p>
          <p className="text-gray-500">21% more than last month</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="stat shadow-md bg-white p-6 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="w-10 h-10 text-purple-500" />
            <h2 className="text-lg font-semibold">Tasks Completed</h2>
          </div>
          <p className="text-4xl font-bold text-purple-600 mt-3">86%</p>
          <p className="text-gray-500">31 tasks remaining</p>
        </motion.div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Growth Analytics</h2>
        <PyChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
