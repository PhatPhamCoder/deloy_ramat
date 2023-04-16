import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const getBlogCategories = async () => {
  const response = await axiosInstance.get(`${base_url}blogcategory/`);

  return response.data;
};

const createBlogCategory = async (bcategory) => {
  const response = await axiosInstance.post(
    `${base_url}blogcategory/`,
    bcategory,
    config,
  );

  return response.data;
};

const updateBlogCategory = async (blogCat) => {
  const response = await axiosInstance.put(
    `${base_url}blogcategory/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config,
  );

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axiosInstance.get(
    `${base_url}blogcategory/${id}`,
    config,
  );

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axiosInstance.delete(
    `${base_url}blogcategory/${id}`,
    config,
  );

  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
};

export default bCategoryService;
