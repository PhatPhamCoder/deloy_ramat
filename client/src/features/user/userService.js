import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getTokenfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

// console.log(getTokenfromLocalStorage);
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenfromLocalStorage !== null ? getTokenfromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

const register = async (userData) => {
  const response = await axiosInstance.post(
    `${base_url}user/register`,
    userData,
  );

  if (response.data) {
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axiosInstance.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const getUserWishlist = async () => {
  const response = await axiosInstance.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axiosInstance.post(
    `${base_url}user/cart`,
    cartData,
    config,
  );
  if (response.data) {
    return response.data;
  }
};

const getCart = async (data) => {
  const response = await axiosInstance.get(`${base_url}user/cart`, data);
  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async (data) => {
  const response = await axiosInstance.delete(
    `${base_url}user/delete-product-cart/${data.id}`,
    data.configCart,
  );
  if (response.data) {
    return response.data;
  }
};

const updateProductQuantityFromCart = async (cartDetail) => {
  const response = await axiosInstance.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    config,
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  const response = await axiosInstance.post(
    `${base_url}user/cart/create-order`,
    orderDetail,
    config,
  );
  if (response.data) {
    return response.data;
  }
};

const getUserOrders = async () => {
  const response = await axiosInstance.get(
    `${base_url}user/get-my-order`,
    config,
  );
  if (response.data) {
    return response.data;
  }
};

const updateUser = async (data) => {
  const response = await axiosInstance.put(
    `${base_url}user/edit-user`,
    data.data,
    data.configUpdateUser,
  );
  if (response.data) {
    return response.data;
  }
};

const forgotPassword = async (data) => {
  const response = await axiosInstance.post(
    `${base_url}user/forgot-password-token`,
    data,
  );
  if (response.data) {
    return response.data;
  }
};

const resetPassword = async (data) => {
  const response = await axiosInstance.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data?.password },
  );
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async (data) => {
  const response = await axiosInstance.delete(
    `${base_url}user/empty-cart`,
    data,
  );
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductQuantityFromCart,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPassword,
  resetPassword,
  emptyCart,
};
