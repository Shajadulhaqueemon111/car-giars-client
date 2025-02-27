/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import nexiosInstance from "@/config/nexious.config";
import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Input,
  Button,
} from "@nextui-org/react";

const PopularCar = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data }: any = await nexiosInstance.get("/cars");
        setCars(data?.data || []);
        setFilteredCars(data?.data || []);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Search Functionality
  useEffect(() => {
    const filtered = cars.filter((car) =>
      car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [searchTerm, cars]);

  // Pagination Logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <p className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-6 tracking-wider">
        Popular Cars
      </p>

      <div className="w-full max-w-lg mb-6">
        <Input
          placeholder="Search cars by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 w-full max-w-7xl">
        {currentCars.length > 0 ? (
          currentCars.map((item: any) => (
            <Card
              key={item._id}
              className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:z-20"
            >
              <CardHeader className="absolute z-10 top-4 left-4 flex flex-col items-start space-y-1 backdrop-blur-md bg-white/10 p-2 rounded-md">
                <p className="text-xs text-white/70 uppercase font-semibold tracking-wider">
                  Rating: {item.rating}
                </p>
                <h4 className="text-white font-bold text-xl uppercase">
                  {item.name}
                </h4>
              </CardHeader>

              <Image
                removeWrapper
                alt={item.name}
                className="z-0 w-full h-full object-cover transition-transform duration-500"
                src={item.image}
              />

              <CardFooter className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-lg bg-white/20 dark:bg-black/20 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-white/90 font-medium">
                    Brand: {item.brand}
                  </p>
                  <p className="text-xs text-white/70">Color: {item.color}</p>
                </div>
                <Link
                  href={`cars/${item._id}`}
                  className="text-sm font-semibold text-blue-400 dark:text-blue-300 hover:underline"
                >
                  View Details
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-lg col-span-full text-center">
            No cars found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex space-x-2 mt-6">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PopularCar;
