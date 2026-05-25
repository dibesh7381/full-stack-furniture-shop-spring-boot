import { createSlice } from "@reduxjs/toolkit";

import cartAPI from "../api/cartAPI";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {

    setCart: (state, action) => {

      state.cartItems = action.payload;
    },
  },
});

export const {
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;

/* =========================
        CART APIS
========================= */

export const fetchCartItems =
  () => async (dispatch) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await cartAPI.get(
        "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        setCart(response.data.data)
      );

    } catch (error) {

      console.log(error);
    }
  };

export const addProductToCart =
  (productId) => async (dispatch) => {

    try {

      const token =
        localStorage.getItem("token");

      await cartAPI.post(
        `/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchCartItems());

    } catch (error) {

      console.log(error);
    }
  };

export const increaseCartQuantity =
  (cartId) => async (dispatch) => {

    try {

      const token =
        localStorage.getItem("token");

      await cartAPI.put(
        `/increase/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchCartItems());

    } catch (error) {

      console.log(error);
    }
  };

export const decreaseCartQuantity =
  (cartId) => async (dispatch) => {

    try {

      const token =
        localStorage.getItem("token");

      await cartAPI.put(
        `/decrease/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchCartItems());

    } catch (error) {

      console.log(error);
    }
  };

export const deleteCartProduct =
  (cartId) => async (dispatch) => {

    try {

      const token =
        localStorage.getItem("token");

      await cartAPI.delete(
        `/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchCartItems());

    } catch (error) {

      console.log(error);
    }
  };

export const clearAllCart =
  () => async (dispatch) => {

    try {

      const token =
        localStorage.getItem("token");

      await cartAPI.delete(
        "/clear",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchCartItems());

    } catch (error) {

      console.log(error);
    }
  };