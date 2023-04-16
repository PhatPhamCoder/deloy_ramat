import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const login = async (userData) => {
  const response = await axiosInstance.post(
    `${base_url}user/admin-login`,
    userData,
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axiosInstance.get(
    `${base_url}user/get-all-orders`,
    config,
  );
  return response.data;
};

const getOrder = async (id) => {
  const response = await axiosInstance.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config,
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
