import axios from "axios"

const apiClient = axios.create({
  baseURL: "http://localhost/funds-manager-backend/api/Fund",
  withCredentials: false,
})

const authClient = axios.create({
  baseURL: 'http://localhost/funds-manager-backend/api/Auth',
  withCredentials: false,
})

apiClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})


export default {
  login(data) {
    return authClient.post('/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  getFunds() {
    return apiClient.get("/index", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  getFund(id) {
    return apiClient.get("/readSingle/" + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  createFund(fund) {
    return apiClient.post("/store", fund, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  deposit(deposit) {
    return apiClient.post("/deposit", deposit, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  withdraw(withdrawal) {
    return apiClient.post("/withdraw", withdrawal, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  getDepositsHistory() {
    return apiClient.get("/getDepositsHistory/all", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  getWithdrawalsHistory() {
    return apiClient.get("/getWithdrawalsHistory/all", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  getDepositsHistoryForFund(id) {
    return apiClient.get("/getDepositsHistory/" + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  getWithdrawalsHistoryForFund(id) {
    return apiClient.get("/getWithdrawalsHistory/" + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  setFundName(data) {
    return apiClient.post("/setFundName/", data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  setFundPercentage(data) {
    return apiClient.post("/setFundPercentage/", data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  setSize(data) {
    return apiClient.post("/setSize/", data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
  setFundNotes(data) {
    return apiClient.post("/setNotes/", data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  },
};
