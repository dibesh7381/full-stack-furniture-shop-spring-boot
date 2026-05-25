import axios from "axios";

const productAPI = axios.create({
  baseURL: "https://full-stack-furniture-shop-spring-boot.onrender.com/api/products",
});

export default productAPI;