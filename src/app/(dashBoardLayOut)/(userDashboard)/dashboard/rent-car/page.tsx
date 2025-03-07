/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";
import toast from "react-hot-toast";
import Link from "next/link";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";

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
const RentCar = () => {
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
        setRents(response.data.data); // ✅ TypeScript now recognizes 'data'
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

  // Call fetchRents on component mount
  useEffect(() => {
    fetchRents();
  }, []);
  const handleDelete = async (rentId: string) => {
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

          const response = await nexiosInstance.delete<ApiResponse>(
            `/rents/${rentId}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          if (response.data.success) {
            setRents((prevUsers) =>
              prevUsers.filter((rent: { _id: string }) => rent._id !== rentId)
            );

            Swal.fire({
              title: "Deleted!",
              text: "Rent Car data has been deleted successfully.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Failed to delete the Rent Car.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the user.",
            icon: "error",
          });
        }
      }
    });
  };
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
                <th className="border px-2 py-1">Update</th>
                <th className="border px-2 py-1">Delete</th>
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
                    <Link href={`/dashboard/rent-car/${rent._id}`}>
                      <button className="btn btn-accent text-xs sm:text-sm">
                        Update
                      </button>
                    </Link>
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleDelete(rent._id)}
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
        <p className="text-center">No rental records found.</p>
      )}
    </div>
  );
};

export default RentCar;
