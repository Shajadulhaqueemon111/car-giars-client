/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const jwtVeryfy = (token: string) => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const decode = (token: string) => {
  try {
    const decoded = jwtDecode(token) as JwtPayload;
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
