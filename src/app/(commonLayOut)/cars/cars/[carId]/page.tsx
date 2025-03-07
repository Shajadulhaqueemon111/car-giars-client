/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";
import { useUser } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const ContactDeller = () => {
  const { user } = useUser();
  const { carId } = useParams();

  const handelContactDeller = async (e: any) => {
    e.preventDefault();

    const startingPoint = e.target.startingPoint.value;
    const destination = e.target.destination.value;

    const rentCarData = {
      startingPoint,
      destination,
      car: carId,
      user: user?._id,
    };

    console.log("Rent Car Data:", rentCarData);
    const token = await getCookies();
    if (!token) {
      console.log("⚠️ No token found. Please login again.", token);

      return;
    }
    try {
      const response = await nexiosInstance.post("/rents", rentCarData, {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("✅ API Response:", response.data);
      toast.success("car rent successfully");
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  return (
    <div>
      <h1>This is Contact Deller</h1>
      <form onSubmit={handelContactDeller} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Starting Point</span>
          </label>
          <input
            type="text"
            name="startingPoint"
            placeholder="Enter starting point"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Destination</span>
          </label>
          <input
            type="text"
            name="destination"
            placeholder="Enter destination"
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

export default ContactDeller;
