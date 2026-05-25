/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import productAPI from "../api/productAPI";

import {
  Package,
  IndianRupee,
  Boxes,
  ImagePlus,
  Pencil,
  Trash2,
  LoaderCircle,
} from "lucide-react";

const SellerDashboard = () => {

  const formRef = useRef(null);

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editProductId, setEditProductId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      type: "",
      stock: "",
      price: "",
      image: null,
    });

  const inputHandler = (e) => {

    const {
      name,
      value,
      files,
    } = e.target;

    if (name === "image") {

      setFormData({
        ...formData,
        image: files[0],
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getMyProducts = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await productAPI.get(
          "/my-products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setProducts(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const data =
        new FormData();

      data.append(
        "type",
        formData.type
      );

      data.append(
        "stock",
        formData.stock
      );

      data.append(
        "price",
        formData.price
      );

      if (formData.image) {

        data.append(
          "image",
          formData.image
        );
      }

      if (editProductId) {

        const response =
          await productAPI.put(
            `/${editProductId}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setProducts((prev) =>
          prev.map((product) =>
            product.id ===
            editProductId
              ? response.data.data
              : product
          )
        );

      } else {

        const response =
          await productAPI.post(
            "/add",
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setProducts((prev) => [
          response.data.data,
          ...prev,
        ]);
      }

      setFormData({
        type: "",
        stock: "",
        price: "",
        image: null,
      });

      document.getElementById(
        "imageInput"
      ).value = "";

      setEditProductId(null);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const deleteHandler = async (
    productId
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await productAPI.delete(
        `/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !==
            productId
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  const editHandler = (
    product
  ) => {

    setEditProductId(
      product.id
    );

    setFormData({
      type: product.type,
      stock: product.stock,
      price: product.price,
      image: null,
    });

    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] px-4 py-8">

      <div className="max-w-7xl mx-auto">

        {/* Form */}

        <div
          ref={formRef}
          className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-10"
        >

          <h2 className="text-3xl font-bold text-[#3e2c23] mb-8">

            {editProductId
              ? "Update Product"
              : "Add Product"}

          </h2>

          <form
            onSubmit={
              submitHandler
            }
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            {/* FORM SAME */}

          </form>

        </div>

        {/* Products */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

          {products.map((product, index) => (

            <motion.div
              key={product.id}

              initial={{
                opacity: 0,
                y: 80,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
                amount: 0.2,
              }}

              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}

              className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col h-full"
            >

              {/* Image */}

              <div className="h-[300px] overflow-hidden">

                <img
                  src={
                    product.imageUrl
                  }
                  alt={
                    product.type
                  }
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />

              </div>

              {/* Content */}

              <div className="p-5 flex flex-col flex-1">

                <div className="flex items-start justify-between gap-3 mb-4 min-h-[72px]">

                  <h2 className="text-2xl font-bold text-[#3e2c23] break-words leading-tight flex-1">
                    {product.type}
                  </h2>

                  <span className="bg-[#f5efe6] min-w-[90px] h-[38px] px-3 rounded-full text-sm font-medium flex items-center justify-center shrink-0">
                    Stock {product.stock}
                  </span>

                </div>

                <div className="min-h-[50px] flex items-center mb-5">

                  <h3 className="text-2xl font-bold text-[#3e2c23] break-all">
                    ₹ {product.price}
                  </h3>

                </div>

                <div className="flex gap-3 mt-auto">

                  <button
                    onClick={() =>
                      editHandler(
                        product
                      )
                    }
                    className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white h-[52px] rounded-2xl flex items-center justify-center gap-2"
                  >

                    <Pencil size={18} />

                    Update

                  </button>

                  <button
                    onClick={() =>
                      deleteHandler(
                        product.id
                      )
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 transition text-white h-[52px] rounded-2xl flex items-center justify-center gap-2"
                  >

                    <Trash2 size={18} />

                    Delete

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default SellerDashboard;