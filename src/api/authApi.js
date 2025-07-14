import axios from "axios";
import { clientServer } from "../config/axios"

export const registerApi = async(userAuthData) =>{
    const response = await clientServer.post("/api/auth/register", userAuthData);
    return response.data;
}

export const loginApi = async (credentials) => {
    const response = await clientServer.post("/api/auth/login", credentials);
    return response.data;
  };

export const userProfileApi = async (tokenObj) => {
  try {
    if (!tokenObj?.token) {
      console.error("❌ No token provided to userProfileApi");
      return null;
    }

    console.log("Token in API call:", tokenObj.token);

    const response = await clientServer.get("/api/auth/getUser", {
      headers: {
        Authorization: `Bearer ${tokenObj.token}`,
      },
    });

    console.log("Response data:", response.data.user);
    return response.data.user;

  } catch (error) {
    console.error("❌ Error in userProfileApi:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      stack: error.stack,
    });
    return null;
  }
};


