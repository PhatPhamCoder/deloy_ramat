import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getUsers = async () => {
  const response = await axiosInstance.get(`${base_url}user/all-users`, config);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
