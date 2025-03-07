"use client";
import React from "react";
import { motion } from "framer-motion";

import { FaCar, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Card, CardBody } from "@nextui-org/react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          About Our Car Booking Service
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Fast, Reliable, and Comfortable Rides Anytime, Anywhere.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {["Easy Booking", "Affordable Pricing", "24/7 Support"].map(
          (feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card className="p-6 text-center shadow-lg">
                <CardBody>
                  {" "}
                  <FaCar className="text-4xl text-blue-500 mx-auto" />
                  <h3 className="text-xl font-semibold mt-4">{feature}</h3>
                </CardBody>
              </Card>
            </motion.div>
          )
        )}
      </div>

      {/* Interactive Contact Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-16 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
        <p className="text-gray-600 mt-2">We’re here to assist you 24/7.</p>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2 text-gray-700">
            <FaPhone className="text-blue-500" />
            <span>+123 456 789</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-green-500" />
            <span>New York, USA</span>
          </div>
        </div>
        <Button className="mt-4">Contact Us</Button>
      </motion.div>
    </div>
  );
};

export default AboutPage;
