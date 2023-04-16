import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getBrands = async () => {
  const response = await axiosInstance.get(`${base_url}brand/`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axiosInstance.post(`${base_url}brand/`, brand, config);

  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axiosInstance.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config,
  );

  return response.data;
};

const getBrand = async (id) => {
  const response = await axiosInstance.get(`${base_url}brand/${id}`, config);

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axiosInstance.delete(`${base_url}brand/${id}`, config);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
