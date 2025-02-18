"use client";
import { Button } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

const GoogleLoginBtn = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  console.log("Redirect URL:", redirect);

  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: redirect });
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div>
      <Button onPress={handleSignIn}>Login with Google</Button>
    </div>
  );
};

export default GoogleLoginBtn;
