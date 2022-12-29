import axios from "axios"

const apiClient = axios.create({
  baseURL: "https://backend-funds-manager.onrender.com/api/fund",
  withCredentials: false,
})

const authClient = axios.create({
  baseURL: 'https://backend-funds-manager.onrender.com/api/auth',
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
  register(data) {
    return authClient.post('/register', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  getFunds() {
    return apiClient.get("/index", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  getFund(id) {
    return apiClient.get("/readSingle/" + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  createFund(fund) {
    return apiClient.post("/store", fund, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  deposit(deposit) {
    return apiClient.post("/deposit", deposit, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  withdraw(withdrawal) {
    return apiClient.post("/withdraw", withdrawal, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  getDepositsHistory() {
    return apiClient.get("/getDepositsHistory/all", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  getWithdrawalsHistory() {
    return apiClient.get("/getWithdrawalsHistory/all", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  getDepositsHistoryForFund(id) {
    return apiClient.get("/getDepositsHistory/" + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  getWithdrawalsHistoryForFund(id) {
    return apiClient.get("/getWithdrawalsHistory/" + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  setFundName(data) {
    return apiClient.post("/setFundName/", data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  setFundPercentage(data) {
    return apiClient.post("/setFundPercentage/", data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  setSize(data) {
    return apiClient.post("/setSize/", data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
  setFundNotes(data) {
    return apiClient.post("/setNotes/", data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
  },
};
