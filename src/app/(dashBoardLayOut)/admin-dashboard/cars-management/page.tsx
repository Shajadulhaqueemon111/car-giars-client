/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AddCars from "./components/AddCars";
import nexiosInstance from "@/config/nexious.config";

const CarsManagement = async () => {
  const res: any = await nexiosInstance.get("/cars", {
    next: {
      tags: ["carsTable"],
    },
  });
  console.log(res);
  return (
    <div>
      <AddCars></AddCars>
      <div>
        {res.data?.data?.map((car: any) => {
          <div key={car._id}>
            <h1>{car.name}</h1>
          </div>;
        })}
      </div>
    </div>
  );
};

export default CarsManagement;
