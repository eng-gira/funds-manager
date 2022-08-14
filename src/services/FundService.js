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
  setFundName(data) {
    return apiClient.post("/setFundName/", data);
  },
  setFundPercentage(data) {
    return apiClient.post("/setFundPercentage/", data);
  },
  setSize(data) {
    return apiClient.post("/setSize/", data);
  },
  setFundNotes(data) {
    return apiClient.post("/setNotes/", data);
  },
};
