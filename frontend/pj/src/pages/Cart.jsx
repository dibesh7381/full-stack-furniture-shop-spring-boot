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

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

const Cart = () => {

  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.totalPrice,
    0
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
              onClick={() =>
                dispatch(clearAllCart())
              }
              className="bg-red-500 hover:bg-red-600 transition text-white px-6 h-[52px] rounded-2xl font-medium shrink-0"
            >
              Clear Cart
            </button>

          )}

        </div>

        {/* Empty Cart */}

        {cartItems.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center justify-center text-center">

            <ShoppingBag
              size={70}
              className="text-[#7a685d] mb-5"
            />

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
                  className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col sm:flex-row min-h-[260px]"
                >

                  {/* Image */}

                  <div className="w-full sm:w-[220px] h-[260px] shrink-0 overflow-hidden">

                    <img
                      src={item.imageUrl}
                      alt={item.productType}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* Content */}

                  <div className="flex-1 p-5 flex flex-col justify-between min-w-0">

                    {/* Top */}

                    <div>

                      <div className="flex items-start justify-between gap-4 mb-4 min-h-[90px]">

                        <div className="min-w-0 flex-1">

                          <h2 className="text-3xl font-bold text-[#3e2c23] capitalize break-words leading-tight">
                            {item.productType}
                          </h2>

                          <p className="text-[#7a685d] mt-2">
                            Available Stock :
                            {" "}
                            {item.stock}
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            dispatch(
                              deleteCartProduct(
                                item.cartId
                              )
                            )
                          }
                          className="bg-red-100 hover:bg-red-200 transition p-3 rounded-xl shrink-0 h-[48px] w-[48px] flex items-center justify-center"
                        >

                          <Trash2
                            size={20}
                            className="text-red-600"
                          />

                        </button>

                      </div>

                      {/* Price */}

                      <div className="min-h-[50px] flex items-center mb-6">

                        <h3 className="text-2xl font-bold text-[#3e2c23] break-all">
                          ₹ {item.price}
                        </h3>

                      </div>

                    </div>

                    {/* Bottom */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                      {/* Quantity */}

                      <div className="flex items-center gap-4 bg-[#f8f4ef] w-fit px-4 h-[60px] rounded-2xl shrink-0">

                        <button
                          onClick={() =>
                            dispatch(
                              decreaseCartQuantity(
                                item.cartId
                              )
                            )
                          }
                          className="bg-white shadow h-[38px] w-[38px] rounded-xl flex items-center justify-center shrink-0"
                        >

                          <Minus size={18} />

                        </button>

                        <span className="text-xl font-bold w-[50px] text-center shrink-0">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              increaseCartQuantity(
                                item.cartId
                              )
                            )
                          }
                          className="bg-white shadow h-[38px] w-[38px] rounded-xl flex items-center justify-center shrink-0"
                        >

                          <Plus size={18} />

                        </button>

                      </div>

                      {/* Total */}

                      <div className="min-w-[170px] h-[60px] flex items-center justify-end shrink-0">

                        <h2 className="text-3xl font-bold text-[#3e2c23] text-right break-all">
                          ₹ {item.totalPrice}
                        </h2>

                      </div>

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

                  <span className="text-[#7a685d] text-lg">
                    Total Items
                  </span>

                  <span className="font-bold text-xl">
                    {cartItems.length}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[#7a685d] text-lg">
                    Total Amount
                  </span>

                  <span className="font-bold text-2xl text-[#3e2c23] break-all text-right">
                    ₹ {totalAmount}
                  </span>

                </div>

              </div>

              <button className="w-full mt-8 bg-[#3e2c23] hover:bg-[#2a1c16] transition text-white h-[58px] rounded-2xl text-lg font-semibold">
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
