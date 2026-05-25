/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { jwtDecode } from "jwt-decode";

import productAPI from "../api/productAPI";

import { addProductToCart } from "../redux/cartSlice";

import {
  ShoppingCart,
  Zap,
  Boxes,
  LoaderCircle,
} from "lucide-react";

const AllProducts = () => {

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const [role, setRole] = useState("");

  const [loadingId, setLoadingId] =
    useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    if (token) {

      const decoded = jwtDecode(token);

      setRole(decoded.role);
    }

  }, [token]);

  const getAllProducts = async () => {

    try {

      const response =
        await productAPI.get(
          "/all-products"
        );

      setProducts(response.data.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCartHandler = async (
    productId
  ) => {

    try {

      setLoadingId(productId);

      await dispatch(
        addProductToCart(productId)
      );

      getAllProducts();

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingId(null);
    }
  };

  const isSeller =
    role === "SELLER";

  return (
    <div className="min-h-screen bg-[#f5efe6] px-4 py-8">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-10 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-[#3e2c23] mb-4">
            All Furniture Products
          </h1>

          <p className="text-[#6b5b53] text-base md:text-lg">
            Explore premium furniture collection
          </p>

        </div>

        {/* Products */}

        {products.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
              >

                {/* Image */}

                <div className="overflow-hidden">

                  <img
                    src={product.imageUrl}
                    alt={product.type}
                    className="w-full h-[300px] object-cover hover:scale-105 transition duration-500"
                  />

                </div>

                {/* Content */}

                <div className="p-5 flex flex-col flex-1">

                  <div className="flex items-start justify-between gap-3 mb-4 min-h-[64px]">

                    <div className="flex-1 overflow-hidden">

                      <h2 className="text-2xl font-bold text-[#3e2c23] capitalize break-words">
                        {product.type}
                      </h2>

                    </div>

                    <div className="bg-[#f8f4ef] px-3 py-2 rounded-xl flex items-center gap-2 min-w-[78px] justify-center shrink-0">

                      <Boxes
                        size={16}
                        className="text-[#6b5b53]"
                      />

                      <span className="text-sm font-medium text-[#3e2c23]">
                        {product.stock}
                      </span>

                    </div>

                  </div>

                  {/* Price */}

                  <div className="min-h-[48px] flex items-center mb-6">

                    <h3 className="text-3xl font-bold text-[#3e2c23] break-all">
                      ₹ {product.price}
                    </h3>

                  </div>

                  {/* Buttons */}

                  <div className="flex gap-3 min-h-[52px] mt-auto">

                    <button
                      disabled={
                        isSeller ||
                        loadingId === product.id
                      }
                      onClick={() =>
                        addToCartHandler(
                          product.id
                        )
                      }
                      className={`flex-1 min-w-0 py-3 rounded-2xl flex items-center justify-center gap-2 font-medium transition ${
                        isSeller
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#3e2c23] hover:bg-[#2b1d16] text-white"
                      }`}
                    >

                      {loadingId ===
                      product.id ? (

                        <LoaderCircle
                          size={18}
                          className="animate-spin shrink-0"
                        />

                      ) : (

                        <ShoppingCart
                          size={18}
                          className="shrink-0"
                        />

                      )}

                      <span className="truncate">
                        Cart
                      </span>

                    </button>

                    <button
                      disabled={isSeller}
                      className={`flex-1 min-w-0 py-3 rounded-2xl flex items-center justify-center gap-2 font-medium transition ${
                        isSeller
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-amber-500 hover:bg-amber-600 text-white"
                      }`}
                    >

                      <Zap
                        size={18}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        Buy
                      </span>

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="flex justify-center items-center py-20">

            <h2 className="text-2xl font-semibold text-[#6b5b53]">
              No products found
            </h2>

          </div>

        )}

      </div>

    </div>
  );
};

export default AllProducts;