import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getProducts = async () => {
  const response = await axiosInstance.get(`${base_url}product`);

  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axiosInstance.get(`${base_url}product/${id}`);

  if (response.data) {
    return response.data;
  }
};

const addToWishList = async (prodId) => {
  const response = await axiosInstance.put(
    `${base_url}product/wishlist`,
    { prodId },
    config,
  );
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  addToWishList,
  getSingleProduct,
};
