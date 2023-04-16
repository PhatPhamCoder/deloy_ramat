import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const uploadImg = async (data) => {
  const response = await axiosInstance.post(`${base_url}upload`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axiosInstance.delete(
    `${base_url}upload/delete-img/${id}`,
    config,
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
