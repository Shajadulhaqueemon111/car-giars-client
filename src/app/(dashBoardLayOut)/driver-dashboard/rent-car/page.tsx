/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";
import toast from "react-hot-toast";
import Link from "next/link";

// Define Rent type
interface Rent {
  _id: string;
  user: string;
  car: string;
  rentStatus: string;
  startingPoint: string;
  destination: string;
}
type ApiResponse = {
  success: boolean;
  message?: string;
  role: string;
};
const RentAllCars = () => {
  const [rents, setRents] = useState<Rent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRents = async () => {
    const token = await getCookies();
    if (!token) {
      console.log("⚠️ No token found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      // Explicitly define the response type
      const response = await nexiosInstance.get<{ data: Rent[] }>("/rents", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setRents(response.data.data);
        toast.success("Rents retrieved successfully!");
      } else {
        console.warn("⚠️ No rental data found");
        toast.error("No rental data available.");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      toast.error("Failed to retrieve rents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Rent Car List</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : rents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-sm sm:text-base">
                <th className="border px-2 py-1">Rent ID</th>
                <th className="border px-2 py-1">User ID</th>
                <th className="border px-2 py-1">Car ID</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Starting Point</th>
                <th className="border px-2 py-1">Destination</th>

                <th className="border px-4 py-1">Driver-BID</th>
              </tr>
            </thead>
            <tbody>
              {rents.map((rent) => (
                <tr key={rent._id} className="border text-sm hover:bg-gray-100">
                  <td className="border px-2 py-1">{rent._id}</td>
                  <td className="border px-2 py-1">{rent.user}</td>
                  <td className="border px-2 py-1">{rent.car}</td>
                  <td
                    className={`border px-2 py-1 text-white font-semibold ${
                      rent.rentStatus === "pending"
                        ? "bg-yellow-500"
                        : rent.rentStatus === "ongoing"
                        ? "bg-blue-500"
                        : rent.rentStatus === "completed"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {rent.rentStatus}
                  </td>

                  <td className="border px-2 py-1">{rent.startingPoint}</td>
                  <td className="border px-2 py-1">{rent.destination}</td>
                  <td className="border px-2 py-1">
                    <Link href={`/driver-dashboard/rent-car/${rent._id}`}>
                      <button className="btn btn-error text-xs sm:text-sm">
                        Bid
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No rental records found.</p>
      )}
    </div>
  );
};

export default RentAllCars;
