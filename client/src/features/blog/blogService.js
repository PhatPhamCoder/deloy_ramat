import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getBlogs = async () => {
  const response = await axiosInstance.get(`${base_url}blog`);

  if (response.data) {
    return response.data;
  }
};

const getBlog = async (id) => {
  const response = await axiosInstance.get(`${base_url}blog/${id}`);

  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  getBlogs,
  getBlog,
};
