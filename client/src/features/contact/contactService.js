import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const postQuery = async (contactData) => {
  const response = await axiosInstance.post(`${base_url}enquiry`, contactData);

  if (response.data) {
    return response.data;
  }
};

export const contactService = {
  postQuery,
};
