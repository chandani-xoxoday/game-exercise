import axios from "axios";

const prodUrl = "http://127.0.0.1:5000/api";

axios.defaults.baseURL = prodUrl;
axios.defaults.timeout = 50000;

axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default axios;

export const setTokenHeader = () => {
  const token = localStorage.getItem("APDsession");
  if (token) {
    axios.defaults.headers.common = {
      "x-access-token": token,
    };
  }
};
