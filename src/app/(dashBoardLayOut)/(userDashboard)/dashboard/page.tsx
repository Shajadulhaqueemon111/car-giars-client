/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { User, Calendar, Car } from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { useUser } from "@/context/AuthContext";
import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";
import toast from "react-hot-toast";

interface Rent {
  _id: string;
  user: string;
  car: string;
  rentStatus: "pending" | "ongoing" | "completed";
  startingPoint: string;
  destination: string;
}

const DashboardPage = () => {
  const { user } = useUser();
  const [rents, setRents] = useState<Rent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRents = async () => {
    const token = await getCookies();
    if (!token) {
      console.log("⚠️ No token found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      const response = await nexiosInstance.get<{ data: Rent[] }>("/rents", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setRents(response.data.data);
      } else {
        toast.error("No rental data available.");
      }
    } catch (error) {
      toast.error("Failed to retrieve rents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  const completedBookings = rents.filter(
    (rent) => rent.rentStatus === "completed"
  );
  const pendingBookings = rents.filter((rent) => rent.rentStatus === "pending");
  const ongoingBookings = rents.filter((rent) => rent.rentStatus === "ongoing");

  // Chart Data
  const statusData = [
    { name: "Pending", count: pendingBookings.length },
    { name: "Ongoing", count: ongoingBookings.length },
    { name: "Completed", count: completedBookings.length },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <User className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold">Profile</h2>
          </CardHeader>
          <CardBody>
            <p className="text-xl font-bold text-blue-400">
              Welcome,
              <br /> Email: {user?.email}
            </p>
          </CardBody>
          <CardFooter>
            <Button className="w-full">Edit Profile</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Car className="w-6 h-6 text-green-500" />
            <h2 className="text-lg font-semibold">Completed Bookings</h2>
          </CardHeader>
          <CardBody className="text-xl font-bold text-blue-400">
            Completed trep:
            {completedBookings.length}
          </CardBody>
          <CardFooter>
            <Button className="w-full">Completed Status</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-red-500" />
            <h2 className="text-lg font-semibold">Upcoming Trips</h2>
          </CardHeader>
          <CardBody className="text-xl font-bold text-blue-400">
            Next ongoing trip: {ongoingBookings.length}
          </CardBody>
          <CardFooter>
            <Button className="w-full">Manage Trips</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Status Chart */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Booking Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
