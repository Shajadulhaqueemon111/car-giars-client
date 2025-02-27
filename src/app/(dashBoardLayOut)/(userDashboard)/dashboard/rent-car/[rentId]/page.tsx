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
  role: string;
};

const UpdatedStatus: React.FC = () => {
  const router = useRouter();
  const { rentId } = useParams();

  const [rentStatus, setrentStatus] = useState("pending");
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
        url: `http://localhost:5000/api/v1/rents/${rentId}`,
        data: { rentStatus },
        headers: {
          Authorization: ` ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("User role updated successfully!");
        setMessage("✅ User rent status updated successfully!");
        router.push("/dashboard/rent-car");
        // Reset form after success
        setrentStatus("users");
      } else {
        setMessage("⚠️ Failed to update user role.");
      }
    } catch (error: any) {
      toast.error("⚠️ Failed to update user role.");
      console.error("Error updating role:", error);
      setMessage(error.response?.data?.message || " Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto">
      <h1>Just Admin and Driver role Updated</h1>
      <h2 className="text-xl font-bold mb-4">Update User Role</h2>

      {message && <p className="mb-3 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selector */}
        <select
          value={rentStatus}
          onChange={(e) => setrentStatus(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value="pending">pending</option>

          <option value="ongoing">ongoing</option>
          <option value="completed">compleled</option>
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
