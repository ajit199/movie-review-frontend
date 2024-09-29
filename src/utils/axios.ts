import axios from "axios";

const baseURL = `https://movie-review-backend-o9ro.onrender.com/api/v1`;
const axiosApi = axios.create({
  baseURL: baseURL,
});

export default axiosApi;
