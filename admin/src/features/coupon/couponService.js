import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const getCoupons = async () => {
  const response = await axiosInstance.get(`${base_url}coupon/`, config);

  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axiosInstance.post(
    `${base_url}coupon/`,
    coupon,
    config,
  );

  return response.data;
};

const updateCoupon = async (coupon) => {
  console.log(coupon);
  const response = await axiosInstance.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config,
  );

  return response.data;
};

const getCoupon = async (id) => {
  const response = await axiosInstance.get(`${base_url}coupon/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axiosInstance.delete(
    `${base_url}coupon/${id}`,
    config,
  );

  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};

export default couponService;
