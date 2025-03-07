/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import nexiosInstance from "@/config/nexious.config";
import { Card, CardFooter, CardHeader, Image } from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// ✅ Define the expected Car type
interface Car {
  _id: string;
  name: string;
  model: string;
  brand: string;
  color: string;
  condition: string;
  fuelType: string;
  passengerCapacity: number;
  rating: number;
  image: string;
}

const CarsDetailsPage = () => {
  const { carId } = useParams(); // ✅ Call useParams at the top level
  const [carData, setCarData] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const res = await nexiosInstance.get<{ data: Car }>(`/cars/${carId}`, {
          cache: "no-store",
          next: {},
        });

        setCarData(res.data.data); // ✅ No more 'unknown' error
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    if (carId) fetchCarData();
  }, [carId]);

  if (!carData) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700">
      <Card
        key={carData._id}
        className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-lg"
      >
        {/* Car Image with Overlay */}
        <div className="relative">
          <Image
            removeWrapper
            alt={carData.name}
            className="w-full h-[500px] object-cover transition-transform transform hover:scale-110"
            src={carData.image}
          />
          {/* Frosted Glass Effect for Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-6">
            <CardHeader className="space-y-2 backdrop-blur-md bg-white/20 p-4 rounded-lg shadow-md">
              <h4 className="text-white font-extrabold text-4xl tracking-wider uppercase">
                {carData.name}{" "}
                <span className="text-lg text-white/70">({carData.model})</span>
              </h4>
              <p className="text-white/80 text-sm font-medium tracking-wide">
                Rating: {carData.rating} / 5
              </p>
            </CardHeader>
          </div>
        </div>

        {/* Footer Section with Frosted Effect */}
        <CardFooter className="p-8 backdrop-blur-md bg-white/20 dark:bg-gray-800/40 rounded-b-lg shadow-lg border-t border-gray-300 dark:border-gray-600">
          <div className="grid grid-cols-2 gap-4 w-full text-gray-800 dark:text-white">
            <div className="space-y-2">
              <p className="font-bold text-2xl">Brand: {carData.brand}</p>
              <p className="font-light text-lg">Model: {carData.model}</p>
              <p className="font-light text-lg">Color: {carData.color}</p>
              <p className="font-light text-lg">
                Condition: {carData.condition}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-light text-lg">
                Fuel Type: {carData.fuelType}
              </p>
              <p className="font-light text-lg">
                Passenger Capacity: {carData.passengerCapacity}
              </p>
              <p className="font-light text-lg">Rating: {carData.rating} / 5</p>
            </div>
          </div>
          <div className="flex mt-6 space-x-4 justify-center">
            <button className="px-6 py-3 rounded-lg border border-gray-300 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              Explore More
            </button>
            <Link href={`/cars/cars/${carData._id}`}>
              <button className="px-6 py-3 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-all">
                Contact Dealer
              </button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CarsDetailsPage;
