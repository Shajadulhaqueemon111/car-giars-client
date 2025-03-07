"use client";
import { useEffect, useState } from "react";
import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";
import toast from "react-hot-toast";
import Link from "next/link";
import Swal from "sweetalert2";

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
        toast.success("Bids retrieved successfully!");
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

  const handleDelete = async (bidId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await getCookies();

          const response = await nexiosInstance.delete<ApiResponse<null>>(
            `/bids/${bidId}`, // ✅ Fix the endpoint
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          if (response.data.success) {
            setBids((prevBids) => prevBids.filter((bid) => bid._id !== bidId));

            Swal.fire({
              title: "Deleted!",
              text: "Bid has been deleted successfully.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Failed to delete the bid.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting bid:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the bid.",
            icon: "error",
          });
        }
      }
    });
  };

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
                <th className="border px-2 py-1">Delete</th>
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
                    <Link href={`/driver-dashboard/manage-all-bids/${bid._id}`}>
                      <button className="btn btn-accent text-xs sm:text-sm">
                        Update
                      </button>
                    </Link>
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleDelete(bid._id)}
                      className="btn btn-error text-xs sm:text-sm"
                    >
                      Delete
                    </button>
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
