import axios from "axios";

const { API_URL } = process.env;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  // withCredentials: true
});

