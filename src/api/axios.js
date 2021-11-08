import axios from "axios";

export const authInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

// axios.interceptors.response((response) => console.log(response));
