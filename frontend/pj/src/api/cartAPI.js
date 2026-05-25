import axios from "axios";

const cartAPI = axios.create({
  baseURL: "https://full-stack-furniture-shop-spring-boot.onrender.com/api/cart",
});

export default cartAPI;