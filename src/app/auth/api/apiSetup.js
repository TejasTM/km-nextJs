import axios from "axios";

const BaseURL ="http://localhost:8080/"
// Axios instance
const ApiSetup = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default ApiSetup;