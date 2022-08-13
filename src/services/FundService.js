import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost/funds-manager-backend/api/Fund",
  withCredentials: false,
});

export default {
  getFunds() {
    return apiClient.get("/index");
  },
  createFund(fund) {
    return apiClient.post("/store", fund);
  },
};
