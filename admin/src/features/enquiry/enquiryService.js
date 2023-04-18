import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const getEnquiries = async () => {
  const response = await axiosInstance.get(`${base_url}enquiry/`);

  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axiosInstance.delete(
    `${base_url}enquiry/${id}`,
    config,
  );

  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axiosInstance.get(`${base_url}enquiry/${id}`, config);

  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axiosInstance.put(
    `${base_url}enquiry/${enq.id}`,
    { status: enq.enqData },
    config,
  );

  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  updateEnquiry,
};

export default enquiryService;
