"use client";
import React, { useEffect, useState } from "react";

const PayMentPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          "https://apollo-gears-backend-tau.vercel.app/api/v1/payment/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: 50, // USD
              currency: "usd",
              userId: "user123",
              productId: "product123",
            }),
          }
        );

        const data = await response.json();
        setClientSecret(data.clientSecret);
        console.log("Client Secret:", data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, []);

  return (
    <div>
      <h1>This is Payment Page</h1>
      {clientSecret && <p>Client Secret: {clientSecret}</p>}
    </div>
  );
};

export default PayMentPage;
