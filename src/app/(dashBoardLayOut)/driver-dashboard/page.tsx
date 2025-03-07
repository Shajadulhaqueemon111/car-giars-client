/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";
import toast from "react-hot-toast";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Bid {
  _id: string;
  bidAmount: number;
  driverId: string;
  rentId: string;
  driverLocation: string;
}

const DriverDashboard = () => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const fetchBids = async () => {
      const token = await getCookies();
      if (!token) {
        console.log("⚠️ No token found. Please login again.");
        return;
      }

      try {
        // ✅ Corrected API response type
        const response = await nexiosInstance.get<ApiResponse<Bid[]>>("/bids", {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status >= 200 && response.status < 300) {
          console.log("✅ API Response:", response.data);
          setBids(response.data.data);
        } else {
          console.error(" API Error (Unexpected Response):", response.data);
          toast.error("Something went wrong! Please try again.");
        }
      } catch (error: any) {
        console.error(" API Error:", error);
        if (error.response) {
          toast.error(
            `Error: ${error.response.data?.message || "Failed to fetch bids"}`
          );
        } else {
          toast.error("Network error! Please check your connection.");
        }
      }
    };

    fetchBids();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          🚗 Welcome to Driver Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-4 text-center">
          Manage your trips, earnings, and profile from here.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-5 rounded-lg text-center shadow-md">
            <h2 className="text-2xl font-bold text-blue-600">Trips</h2>
            <p className="text-gray-700 mt-2">
              View and manage your ride history.
            </p>
          </div>
          <div className="bg-green-100 p-5 rounded-lg text-center shadow-md">
            <h2 className="text-2xl font-bold text-green-600">Bids</h2>
            <p className="text-gray-700 mt-2 font-bold text-xl">
              Total Bids: <span className="font-bold">{bids.length}</span>
            </p>
          </div>
          <div className="bg-purple-100 p-5 rounded-lg text-center shadow-md">
            <h2 className="text-2xl font-bold text-purple-600">Profile</h2>
            <p className="text-gray-700 mt-2">Update your personal details.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all">
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
