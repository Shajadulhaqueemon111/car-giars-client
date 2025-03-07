"use client";
import { useEffect, useState } from "react";
import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";
import toast from "react-hot-toast";
import Link from "next/link";

// Define API Response and Bid types
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Bid {
  bidStatus: string;
  _id: string;
  bidAmount: number;
  driverId: string;
  rentId: string;
  driverLocation: string;
}

const ManageAllBids = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBids = async () => {
    const token = await getCookies();
    if (!token) {
      console.log("⚠️ No token found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      // ✅ Correct API response type
      const response = await nexiosInstance.get<ApiResponse<Bid[]>>("/bids", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setBids(response.data.data);
      } else {
        console.warn("⚠️ No bid data found");
        toast.error("No bid data available.");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      toast.error("Failed to retrieve bids.");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchBids on component mount
  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Bid List</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : bids.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-sm sm:text-base">
                <th className="border px-2 py-1">Rent ID</th>
                <th className="border px-2 py-1">Driver ID</th>
                <th className="border px-2 py-1">Bid Amount</th>
                <th className="border px-2 py-1">Bid Status</th>
                <th className="border px-2 py-1">Driver Location</th>
                <th className="border px-2 py-1">Update</th>
                <th className="border px-2 py-1">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr key={bid._id} className="border text-sm hover:bg-gray-100">
                  <td className="border px-2 py-1">{bid.rentId}</td>
                  <td className="border px-2 py-1">{bid.driverId}</td>
                  <td className="border px-2 py-1">${bid.bidAmount}</td>
                  <td
                    className={`border px-2 py-1 text-white font-semibold ${
                      bid.bidStatus === "pending"
                        ? "bg-yellow-500"
                        : bid.bidStatus === "accepted"
                        ? "bg-blue-500"
                        : bid.bidStatus === "rejected"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {bid.bidStatus || "N/A"}
                  </td>
                  <td className="border px-2 py-1">{bid.driverLocation}</td>
                  <td className="border px-2 py-1">
                    <Link href={`/dashboard/bids-all-cars/${bid._id}`}>
                      <button className="btn btn-accent text-xs sm:text-sm">
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link href="/dashboard/payment-components">
                      <button className="btn btn-success text-xs sm:text-sm text-white">
                        Payment
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No bid records found.</p>
      )}
    </div>
  );
};

export default ManageAllBids;
