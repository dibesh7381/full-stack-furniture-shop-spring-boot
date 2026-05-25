/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import { useSelector } from "react-redux";

import {
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";

const Navbar = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [role, setRole] = useState("");

  const token = localStorage.getItem("token");

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const cartCount = cartItems.length;

  useEffect(() => {

    if (token) {

      const decoded = jwtDecode(token);

      setRole(decoded.role);
    }

  }, [token]);

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/login");

    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-5 h-[70px] flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-black tracking-tight"
          >
            FurnitureShop
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-6 text-[15px] font-medium">

            <Link
              to="/"
              className="text-gray-700 hover:text-black transition"
            >
              Home
            </Link>

            {token && (
              <Link
                to="/products"
                className="text-gray-700 hover:text-black transition"
              >
                Products
              </Link>
            )}

            {!token && (
              <>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-black transition"
                >
                  Signup
                </Link>

                <Link
                  to="/login"
                  className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
                >
                  Login
                </Link>
              </>
            )}

            {token && (
              <>

                {/* Cart */}

                {role === "USER" && (

                  <Link
                    to="/cart"
                    className="relative"
                  >

                    <div className="bg-[#f5efe6] hover:bg-[#ebe1d5] transition p-3 rounded-2xl">

                      <ShoppingCart
                        size={22}
                        className="text-[#3e2c23]"
                      />

                    </div>

                    {cartCount > 0 && (

                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] min-w-[22px] h-[22px] rounded-full flex items-center justify-center font-semibold px-1">
                        {cartCount}
                      </span>

                    )}

                  </Link>

                )}

                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-black transition"
                >
                  Profile
                </Link>

                {role === "SELLER" && (
                  <Link
                    to="/seller-dashboard"
                    className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    Seller Dashboard
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
                >
                  Logout
                </button>

              </>
            )}

          </div>

          {/* Mobile Right Section */}

          <div className="flex items-center gap-3 md:hidden">

            {/* Cart */}

            {token && role === "USER" && (

              <Link
                to="/cart"
                className="relative"
              >

                <div className="bg-[#f5efe6] p-2.5 rounded-2xl">

                  <ShoppingCart
                    size={22}
                    className="text-[#3e2c23]"
                  />

                </div>

                {cartCount > 0 && (

                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>

                )}

              </Link>

            )}

            {/* Hamburger */}

            <button
              onClick={() => setIsOpen(true)}
              className="text-black"
            >
              <Menu size={28} />
            </button>

          </div>

        </div>

      </nav>

      {/* Overlay */}

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}

      <div
        className={`fixed top-0 right-0 h-screen w-[280px] bg-white z-50 transition-transform duration-300 shadow-2xl ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Sidebar Header */}

        <div className="h-[70px] px-5 border-b border-gray-200 flex items-center justify-between">

          <h2 className="text-xl font-bold text-black">
            Menu
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-black"
          >
            <X size={28} />
          </button>

        </div>

        {/* Sidebar Links */}

        <div className="flex flex-col px-5 py-6 gap-2 text-[15px] font-medium">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-black transition py-2"
          >
            Home
          </Link>

          {!token && (
            <>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-black transition py-2"
              >
                Signup
              </Link>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-black text-white text-center py-3 rounded-xl font-semibold mt-2"
              >
                Login
              </Link>
            </>
          )}

          {token && (
            <>

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-black transition py-2"
              >
                Profile
              </Link>

              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-black transition py-2"
              >
                Products
              </Link>

              {role === "SELLER" && (
                <Link
                  to="/seller-dashboard"
                  onClick={() => setIsOpen(false)}
                  className="bg-green-500 text-white text-center py-3 rounded-xl font-semibold mt-2"
                >
                  Seller Dashboard
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition mt-2"
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>
    </>
  );
};

export default Navbar;
