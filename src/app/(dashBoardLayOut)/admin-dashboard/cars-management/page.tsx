/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";
import React from "react";
import AddCars from "./components/AddCars";
import nexiosInstance from "@/config/nexious.config";

const CarsManagement = async () => {
  try {
    const res: any = await nexiosInstance.get("/cars", {
      next: {
        tags: ["carsTable"],
      },
    });
    console.log(res);

    // Check if data is available and handle accordingly
    const cars = res.data?.data ?? [];

    return (
      <div>
        <AddCars />
        <div>
          {cars.length > 0 ? (
            cars.map((car: any) => (
              <div key={car._id}>
                <h1>{car.name}</h1>
              </div>
            ))
          ) : (
            <p>No cars available.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching cars:", error);
    return <p>Error loading cars.</p>;
  }
};

export default CarsManagement;
