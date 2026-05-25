/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

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

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editProductId, setEditProductId] = useState(null);

  const [formData, setFormData] = useState({
    type: "",
    stock: "",
    price: "",
    image: null,
  });

  const inputHandler = (e) => {
    const { name, value, files } = e.target;

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
      const token = localStorage.getItem("token");

      const response = await productAPI.get("/my-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.data);
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

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("type", formData.type);

      data.append("stock", formData.stock);

      data.append("price", formData.price);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editProductId) {
        await productAPI.put(`/${editProductId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await productAPI.post("/add", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setFormData({
        type: "",
        stock: "",
        price: "",
        image: null,
      });

      document.getElementById("imageInput").value = "";

      setEditProductId(null);

      getMyProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await productAPI.delete(`/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getMyProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (product) => {
    setEditProductId(product.id);

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
            {editProductId ? "Update Product" : "Add Product"}
          </h2>

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Type */}

            <div className="bg-[#f8f4ef] border border-[#e7ddd3] rounded-2xl px-4 flex items-center gap-3">
              <Package size={20} className="text-[#7a685d]" />

              <select
                name="type"
                value={formData.type}
                onChange={inputHandler}
                className="w-full bg-transparent py-4 outline-none"
              >
                <option value="">Select Type</option>

                <option value="BED">Bed</option>

                <option value="TABLE">Table</option>

                <option value="CHAIR">Chair</option>
              </select>
            </div>

            {/* Stock */}

            <div className="bg-[#f8f4ef] border border-[#e7ddd3] rounded-2xl px-4 flex items-center gap-3">
              <Boxes size={20} className="text-[#7a685d]" />

              <input
                type="text"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  setFormData({
                    ...formData,
                    stock: value,
                  });
                }}
                className="w-full bg-transparent py-4 outline-none"
              />
            </div>

            {/* Price */}

            <div className="bg-[#f8f4ef] border border-[#e7ddd3] rounded-2xl px-4 flex items-center gap-3">
              <IndianRupee size={20} className="text-[#7a685d]" />

              <input
                type="text"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  setFormData({
                    ...formData,
                    price: value,
                  });
                }}
                className="w-full bg-transparent py-4 outline-none"
              />
            </div>

            {/* Image */}

            <div className="bg-[#f8f4ef] border border-[#e7ddd3] rounded-2xl px-4 flex items-center gap-3">
              <ImagePlus size={20} className="text-[#7a685d]" />

              <input
                id="imageInput"
                type="file"
                name="image"
                onChange={inputHandler}
                className="w-full py-4 outline-none"
              />
            </div>

            {/* Button */}

            <button
              disabled={loading}
              className="md:col-span-2 bg-[#3e2c23] hover:bg-[#2d1f18] transition text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading && <LoaderCircle size={20} className="animate-spin" />}

              {editProductId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>

        {/* Products */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={product.imageUrl}
                alt={product.type}
                className="w-full h-[300px] object-cover"
              />

              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#3e2c23]">
                    {product.type}
                  </h2>

                  <span className="bg-[#f5efe6] px-3 py-1 rounded-full text-sm font-medium">
                    Stock {product.stock}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-5">
                  ₹ {product.price}
                </h3>

                <div className="flex gap-3">
                  <button
                    onClick={() => editHandler(product)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-2xl flex items-center justify-center gap-2"
                  >
                    <Pencil size={18} />
                    Update
                  </button>

                  <button
                    onClick={() => deleteHandler(product.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-2xl flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
