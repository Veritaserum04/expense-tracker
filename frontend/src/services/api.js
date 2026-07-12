import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-backend-k88k.onrender.com/api",
});

export default api;