import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost/funds-manager-backend/api/Fund",
  withCredentials: false,
});

export default {
  getFunds() {
    return apiClient.get("/index");
  },
  getFund(id) {
    return apiClient.get("/readSingle/" + id);
  },
  createFund(fund) {
    return apiClient.post("/store", fund);
  },
  deposit(deposit) {
    return apiClient.post("/deposit", deposit);
  },
  withdraw(withdrawal) {
    return apiClient.post("/withdraw", withdrawal);
  },
  getDepositsHistory() {
    return apiClient.get("/getDepositsHistory/all");
  },
  getWithdrawalsHistory() {
    return apiClient.get("/getWithdrawalsHistory/all");
  },
  getDepositsHistoryForFund(id) {
    return apiClient.get("/getDepositsHistory/" + id);
  },
  getWithdrawalsHistoryForFund(id) {
    return apiClient.get("/getWithdrawalsHistory/" + id);
  },
};
