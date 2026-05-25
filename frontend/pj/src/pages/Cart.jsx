/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchCartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
  deleteCartProduct,
  clearAllCart,
} from "../redux/cartSlice";

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f5efe6] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#3e2c23]">
              My Cart
            </h1>

            <p className="text-[#7a685d] mt-2">
              Manage your furniture cart items
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={() => dispatch(clearAllCart())}
              className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-2xl font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Empty Cart */}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center justify-center text-center">
            <ShoppingBag size={70} className="text-[#7a685d] mb-5" />

            <h2 className="text-3xl font-bold text-[#3e2c23] mb-3">
              Your Cart is Empty
            </h2>

            <p className="text-[#7a685d]">
              Add furniture products to your cart
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}

            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col sm:flex-row"
                >
                  {/* Image */}

                  <img
                    src={item.imageUrl}
                    alt={item.productType}
                    className="w-full sm:w-[220px] h-[240px] sm:h-auto object-cover"
                  />

                  {/* Content */}

                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h2 className="text-3xl font-bold text-[#3e2c23] capitalize">
                            {item.productType}
                          </h2>

                          <p className="text-[#7a685d] mt-2">
                            Available Stock : {item.stock}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(deleteCartProduct(item.cartId))
                          }
                          className="bg-red-100 hover:bg-red-200 transition p-3 rounded-xl"
                        >
                          <Trash2 size={20} className="text-red-600" />
                        </button>
                      </div>

                      <h3 className="text-2xl font-bold text-[#3e2c23] mb-6">
                        ₹ {item.price}
                      </h3>
                    </div>

                    {/* Quantity */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                      <div className="flex items-center gap-4 bg-[#f8f4ef] w-fit px-4 py-3 rounded-2xl">
                        <button
                          onClick={() =>
                            dispatch(decreaseCartQuantity(item.cartId))
                          }
                          className="bg-white shadow p-2 rounded-xl"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="text-xl font-bold w-[40px] text-center shrink-0">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(increaseCartQuantity(item.cartId))
                          }
                          className="bg-white shadow p-2 rounded-xl"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <h2 className="text-3xl font-bold text-[#3e2c23] min-w-[140px] text-right">
                        ₹ {item.totalPrice}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}

            <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-24">
              <h2 className="text-3xl font-bold text-[#3e2c23] mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[#7a685d] text-lg">Total Items</span>

                  <span className="font-bold text-xl">{cartItems.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#7a685d] text-lg">Total Amount</span>

                  <span className="font-bold text-2xl text-[#3e2c23]">
                    ₹ {totalAmount}
                  </span>
                </div>
              </div>

              <button className="w-full mt-8 bg-[#3e2c23] hover:bg-[#2a1c16] transition text-white py-4 rounded-2xl text-lg font-semibold">
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
