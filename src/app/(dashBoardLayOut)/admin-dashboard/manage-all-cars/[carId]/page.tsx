/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getCookies } from "@/app/(commonLayOut)/login"; // Ensure this function correctly retrieves tokens.

type ApiResponse = {
  success: boolean;
  message?: string;
  role: string;
};

const fuelType = [
  { label: "Hybrid", value: "Hybrid" },
  { label: "Octane", value: "Octane" },
  { label: "Electric", value: "Electric" },
  { label: "Diesel", value: "Diesel" },
  { label: "Petrol", value: "Petrol" },
];

const conditions = [
  { label: "New", value: "New" },
  { label: "Used", value: "Used" },
];

const brands = [
  { label: "BMW", value: "BMW" },
  { label: "Mercedes-Benz", value: "Mercedes-Benz" },
  { label: "Porsche", value: "Porsche" },
  { label: "Lamborghini", value: "Lamborghini" },
  { label: "Audi", value: "Audi" },
  { label: "Tesla", value: "Tesla" },
  { label: "Ford", value: "Ford" },
  { label: "Honda", value: "Honda" },
  { label: "Toyota", value: "Toyota" },
];

const UpdateCar: React.FC = () => {
  const { carId } = useParams();

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    color: "",
    image: "",
    fuelType: "",
    condition: "",
    passengerCapacity: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      fuelType: formData.fuelType.trim(),
      condition: formData.condition.trim(),
      model: formData.model.trim(),
      passengerCapacity: Number(formData.passengerCapacity),
      image: formData.image.trim(),
      color: formData.color.trim(),
      rating: Number(formData.rating),
    };

    try {
      const cookies = await getCookies();
      const token = cookies;

      if (!token) {
        toast.error("⚠️ No token found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await axios.patch<ApiResponse>(
        `https://apollo-gears-backend-tau.vercel.app/api/v1/cars/${carId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("🚗 Car updated successfully!");
        router.push("/admin-dashboard/manage-all-cars");
      } else {
        console.log("error");
      }
    } catch (error: any) {
      console.error("Error updating car:", error);
      toast.error("⚠️ Failed to update car.");

      if (error.response) {
        console.error("Response Data:", error.response.data); // Debugging the error response
        toast.error(
          `⚠️ Update failed: ${error.response.data.message || "Unknown error"}`
        );
      } else {
        toast.error("⚠️ Failed to update car. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Car Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Car Name"
          className="input input-bordered w-full"
          required
        />
        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Brand</option>
          {brands.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Fuel Type</option>
          {fuelType.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Car Model"
          className="input input-bordered w-full"
          required
        />
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Condition</option>
          {conditions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="passengerCapacity"
          value={formData.passengerCapacity}
          onChange={handleChange}
          placeholder="Passenger Capacity"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Color"
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Car"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
