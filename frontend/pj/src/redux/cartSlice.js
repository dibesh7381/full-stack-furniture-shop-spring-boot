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

    increaseQuantityLocal: (
      state,
      action
    ) => {

      const item =
        state.cartItems.find(
          (cartItem) =>
            cartItem.cartId ===
            action.payload
        );

      if (item) {

        item.quantity += 1;

        item.totalPrice =
          item.quantity *
          item.price;
      }
    },

    decreaseQuantityLocal: (
      state,
      action
    ) => {

      const item =
        state.cartItems.find(
          (cartItem) =>
            cartItem.cartId ===
            action.payload
        );

      if (
        item &&
        item.quantity > 1
      ) {

        item.quantity -= 1;

        item.totalPrice =
          item.quantity *
          item.price;
      }
    },

    deleteCartLocal: (
      state,
      action
    ) => {

      state.cartItems =
        state.cartItems.filter(
          (item) =>
            item.cartId !==
            action.payload
        );
    },

    clearCartLocal: (
      state
    ) => {

      state.cartItems = [];
    },

    addToCartLocal: (
      state,
      action
    ) => {

      const existingItem =
        state.cartItems.find(
          (item) =>
            item.cartId ===
            action.payload.cartId
        );

      if (existingItem) {

        existingItem.quantity += 1;

        existingItem.totalPrice =
          existingItem.quantity *
          existingItem.price;

      } else {

        state.cartItems.push(
          action.payload
        );
      }
    },
  },
});

export const {
  setCart,
  increaseQuantityLocal,
  decreaseQuantityLocal,
  deleteCartLocal,
  clearCartLocal,
  addToCartLocal,
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

      const response =
        await cartAPI.get(
          "",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      dispatch(
        setCart(
          response.data.data
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

export const addProductToCart =
  (productId) =>
  async (dispatch) => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await cartAPI.post(
          `/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      dispatch(
        addToCartLocal(
          response.data.data
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

export const increaseCartQuantity =
  (cartId) =>
  async (dispatch) => {

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

      dispatch(
        increaseQuantityLocal(
          cartId
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

export const decreaseCartQuantity =
  (cartId) =>
  async (dispatch) => {

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

      dispatch(
        decreaseQuantityLocal(
          cartId
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

export const deleteCartProduct =
  (cartId) =>
  async (dispatch) => {

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

      dispatch(
        deleteCartLocal(
          cartId
        )
      );

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

      dispatch(
        clearCartLocal()
      );

    } catch (error) {

      console.log(error);
    }
  };