import axios from "axios";
import { API_BASE_URL } from "../config/env";

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

// login
export const loginUser = async (input) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/login`, input
    );

    console.log("Response from Backend");
    console.log(response.data);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};
  
  
// sign up
export const signUpUser = async (input) => {
  try {
    console.log("Trying to post");
    const response = await axios.post(
      `${API_BASE_URL}/user/register`, input
    );

    console.log("Response from Backend");
    console.log(response.data);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};