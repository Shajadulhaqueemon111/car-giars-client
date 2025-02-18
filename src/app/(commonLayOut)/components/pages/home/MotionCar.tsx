"use client";

import React from "react";
import { motion } from "motion/react";
import { Image } from "@heroui/react";

const MotionCar = () => {
  return (
    <motion.div
      initial={{ x: 50 }}
      animate={{ y: 40, x: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className="w-3/5 flex justify-end"
    >
      <Image
        alt="card background"
        className="object-cover rounded-xl"
        src="../../assets/hero-car.svg"
      />
    </motion.div>
  );
};

export default MotionCar;
