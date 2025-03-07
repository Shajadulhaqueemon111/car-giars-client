/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import axios from "axios";
import { getCookies } from "@/app/(commonLayOut)/login";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ApiResponse = {
  success: boolean;
  message?: string;
  bidStatus: string;
};

const UpdatedStatus: React.FC = () => {
  const router = useRouter();
  const { bidId } = useParams();

  const [bidStatus, setBidStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = await getCookies(); // Get the token
    console.log(token);
    if (!token) {
      setMessage("⚠️ No token found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.request<ApiResponse>({
        method: "PATCH",
        url: `https://apollo-gears-backend-tau.vercel.app/api/v1/bids/${bidId}`,
        data: { bidStatus },
        headers: {
          Authorization: ` ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Driver Bids status updated successfully!");
        setMessage("✅ Driver Bids status updated successfully!");
        router.push("/admin-dashboard/bids-all-cars");
        // Reset form after success
        setBidStatus("users");
      } else {
        setMessage("⚠️ Failed to update bid Status");
      }
    } catch (error: any) {
      toast.error("⚠️ Failed to update bid Status");
      console.error("Error updating role:", error);
      setMessage(error.response?.data?.message || " Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Update User Role</h2>

      {message && <p className="mb-3 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selector */}
        <select
          value={bidStatus}
          onChange={(e) => setBidStatus(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value="pending">pending</option>

          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </form>
    </div>
  );
};

export default UpdatedStatus;
