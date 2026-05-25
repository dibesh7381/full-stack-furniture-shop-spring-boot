/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

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
    <div className="min-h-screen bg-[#f5efe6] px-3 sm:px-4 py-6 sm:py-8">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 sm:mb-10">

          <div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3e2c23] leading-tight">
              My Cart
            </h1>

            <p className="text-[#7a685d] mt-2 text-sm sm:text-base">
              Manage your furniture cart items
            </p>

          </div>

          {cartItems.length > 0 && (

            <button
              onClick={() =>
                dispatch(clearAllCart())
              }
              className="bg-red-500 hover:bg-red-600 transition text-white px-6 h-[52px] rounded-2xl font-medium shrink-0 w-full sm:w-fit"
            >
              Clear Cart
            </button>

          )}

        </div>

        {/* Empty Cart */}

        {cartItems.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 flex flex-col items-center justify-center text-center">

            <ShoppingBag
              size={70}
              className="text-[#7a685d] mb-5"
            />

            <h2 className="text-2xl sm:text-3xl font-bold text-[#3e2c23] mb-3">
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
                  className="bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-[260px_1fr]"
                >

                  {/* Image */}

                  <div className="w-full h-[280px] sm:h-[340px] md:h-full bg-[#f8f4ef] overflow-hidden flex items-center justify-center">

                    <img
                      src={item.imageUrl}
                      alt={item.productType}
                      className="w-full h-full object-contain md:object-cover"
                    />

                  </div>

                  {/* Content */}

                  <div className="p-5 sm:p-6 flex flex-col justify-between min-w-0">

                    {/* Top */}

                    <div>

                      <div className="flex items-start justify-between gap-4 min-h-[95px]">

                        <div className="flex-1 min-w-0">

                          <h2 className="text-2xl sm:text-3xl font-bold text-[#3e2c23] capitalize break-words leading-tight">
                            {item.productType}
                          </h2>

                          <p className="text-[#7a685d] mt-2 text-sm sm:text-base">
                            Available Stock : {item.stock}
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
                          className="bg-red-100 hover:bg-red-200 transition h-[48px] w-[48px] rounded-xl flex items-center justify-center shrink-0"
                        >

                          <Trash2
                            size={20}
                            className="text-red-600"
                          />

                        </button>

                      </div>

                      {/* Price */}

                      <div className="h-[60px] flex items-center mt-2 mb-6">

                        <h3 className="text-2xl sm:text-3xl font-bold text-[#3e2c23] whitespace-nowrap font-mono">
                          ₹ {item.price}
                        </h3>

                      </div>

                    </div>

                    {/* Bottom */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                      {/* Quantity Box */}

                      <div className="bg-[#f8f4ef] rounded-2xl h-[60px] px-4 flex items-center justify-between gap-4 w-full sm:w-[220px] min-w-[220px] shrink-0">

                        <button
                          onClick={() =>
                            dispatch(
                              decreaseCartQuantity(
                                item.cartId
                              )
                            )
                          }
                          className="bg-white shadow h-[40px] w-[40px] rounded-xl flex items-center justify-center shrink-0"
                        >

                          <Minus size={18} />

                        </button>

                        <span className="text-xl font-bold w-[55px] min-w-[55px] text-center shrink-0 font-mono">
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
                          className="bg-white shadow h-[40px] w-[40px] rounded-xl flex items-center justify-center shrink-0"
                        >

                          <Plus size={18} />

                        </button>

                      </div>

                      {/* Total Price */}

                      <div className="w-full sm:w-[240px] h-[60px] flex items-center sm:justify-end shrink-0">

                        <h2 className="text-2xl sm:text-3xl font-bold text-[#3e2c23] w-full text-left sm:text-right whitespace-nowrap font-mono">
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

                  <span className="font-bold text-xl font-mono">
                    {cartItems.length}
                  </span>

                </div>

                <div className="flex items-center justify-between gap-4">

                  <span className="text-[#7a685d] text-lg">
                    Total Amount
                  </span>

                  <span className="font-bold text-2xl text-[#3e2c23] whitespace-nowrap font-mono">
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