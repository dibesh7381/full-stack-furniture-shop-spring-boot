import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "lucide-react";

import authAPI from "../api/authAPI";

const BecomeSeller = () => {

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const becomeSellerHandler = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await authAPI.put(
        "/become-seller",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      setIsError(false);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/profile");
      }, 1500);

    } catch (error) {

      setIsError(true);

      setMessage(
        error.response?.data?.message ||
        "Failed to become seller"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-[#e7ddd3] rounded-3xl shadow-xl p-8">

        <div className="flex justify-center mb-6">

          <div className="w-24 h-24 rounded-full bg-[#3e2c23] flex items-center justify-center">

            <Store
              size={48}
              className="text-white"
            />

          </div>

        </div>

        <h2 className="text-3xl font-bold text-center text-[#3e2c23] mb-3">
          Become Seller
        </h2>

        <p className="text-center text-[#6b5b53] leading-7 mb-6">
          Upgrade your account to seller and
          start managing furniture products.
        </p>

        {/* Fixed Message Area */}

        <div className="h-[50px] mb-4">

          {message && (
            <div
              className={`h-full flex items-center px-4 rounded-xl text-sm font-medium ${
                isError
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {message}
            </div>
          )}

        </div>

        <button
          onClick={becomeSellerHandler}
          disabled={loading}
          className="w-full bg-[#3e2c23] hover:bg-[#2f2119] transition text-white py-4 rounded-2xl font-semibold disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : "Become Seller"}
        </button>

      </div>

    </div>
  );
};

export default BecomeSeller;