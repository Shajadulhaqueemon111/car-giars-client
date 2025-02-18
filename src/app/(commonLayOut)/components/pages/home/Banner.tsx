import { Card, CardBody } from "@heroui/react";
import React from "react";
import MotionCar from "./MotionCar";
import BannerBtn from "./BannerBtn";

const BannerPage = () => {
  return (
    <div>
      <Card className="py-4 flex" shadow="none">
        <CardBody className="overflow-visible py-2">
          <div className="flex items-center justify-between">
            <div className="w-2/5">
              <h1 className="text-3xl font-bold">
                Exploer the Fitness <span className="text-red-500">Global</span>{" "}
                Offers
              </h1>
              <h4 className="text-xl text-gray-500 my-4">
                Find Your Ideal Ride For Any Adventurer with our divorce range
                of afforable and dependable car rentals
              </h4>
              <BannerBtn />
            </div>
            <MotionCar />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BannerPage;
