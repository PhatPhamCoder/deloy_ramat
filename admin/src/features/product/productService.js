import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const getProducts = async () => {
  const response = await axiosInstance.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axiosInstance.post(
    `${base_url}product/`,
    product,
    config,
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(
    `${base_url}product/${id}`,
    config,
  );

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
};

export default productService;
