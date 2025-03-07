import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: "https://apollo-gears-backend-tau.vercel.app/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default nexiosInstance;
