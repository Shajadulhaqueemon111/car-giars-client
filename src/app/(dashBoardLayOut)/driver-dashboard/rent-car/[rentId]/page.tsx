/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";
import { useUser } from "@/context/AuthContext";
import { useParams } from "next/navigation";

import toast from "react-hot-toast";

const DriverCreateBiddingSystem = () => {
  const { rentId } = useParams();
  const { user } = useUser();
  const handelDriverBid = async (e: any) => {
    e.preventDefault();
    const bidAmount = Number(e.target.bidAmount.value);

    const driverLocation = e.target.driverLocation.value;

    const newDriverBid = {
      bidAmount,

      driverLocation,
      rentId,
      driverId: user?._id,
    };
    console.log(newDriverBid);
    const token = await getCookies();
    if (!token) {
      console.log("⚠️ No token found. Please login again.", token);

      return;
    }
    try {
      const response = await nexiosInstance.post("/bids", newDriverBid, {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("✅ API Response:", response.data);
        toast.success("Car bid successfully");
      } else {
        console.error("❌ API Error (Unexpected Response):", response.data);
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error: any) {
      console.error("❌ API Error:", error);

      // Axios error response handle
      if (error.response) {
        toast.error(
          `Error: ${error.response.data?.message || "Failed to place bid"}`
        );
      } else {
        toast.error("Network error! Please check your connection.");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handelDriverBid} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bid-Amount</span>
          </label>
          <input
            type="number"
            name="bidAmount"
            placeholder="Enter starting point"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Driver-Location</span>
          </label>
          <input
            type="text"
            name="driverLocation"
            placeholder="Enter driverLocation"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Rent Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverCreateBiddingSystem;
