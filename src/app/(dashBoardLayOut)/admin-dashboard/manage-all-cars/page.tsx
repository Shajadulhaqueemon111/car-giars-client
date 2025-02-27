/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import Link from "next/link";
import nexiosInstance from "@/config/nexious.config";
import { getCookies } from "@/app/(commonLayOut)/login";

type Car = {
  _id: string;
  name: string;
  brand: string;
  model: string;
  color: string;
  price: number;
  image: string;
};

const ManageAllCars = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await nexiosInstance.get<{ data: Car[] }>("/cars");
        setCars(response.data.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Handle Delete Item
  const handleDelete = async (carId: string) => {
    const token = await getCookies();

    if (!token) {
      Swal.fire({
        title: "Unauthorized!",
        text: "You need to log in to delete a car.",
        icon: "error",
      });
      return;
    }
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
          const response = await nexiosInstance.delete(`/cars/${carId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            withCredentials: true,
          });

          if (response.status === 200) {
            setCars((prevCars) => prevCars.filter((car) => car._id !== carId));

            Swal.fire({
              title: "Deleted!",
              text: "Car has been deleted successfully.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Failed to delete the car.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting car:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the car.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="text-center">
        <h1>Hurry up</h1>
        <h2 className="text-2xl font-bold">Manage All Cars</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Car Name</th>
                <th>Brand</th>
                <th>Modal</th>
                <th>color</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="Car Image" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.brand}</td>
                  <td>{item.model}</td>
                  <td>{item.color}</td>
                  <td>
                    <Link href={`/admin-dashboard/manage-all-cars/${item._id}`}>
                      <button className="btn btn-ghost  bg-orange-500">
                        <FaEdit className="text-white" />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn bg-orange-500"
                    >
                      <RiDeleteBin6Line className="text-xl font-bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAllCars;
