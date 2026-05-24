import axios from "axios";

const authAPI = axios.create({
  baseURL: "https://full-stack-furniture-shop-spring-boot.onrender.com/api/auth",
});

export default authAPI;