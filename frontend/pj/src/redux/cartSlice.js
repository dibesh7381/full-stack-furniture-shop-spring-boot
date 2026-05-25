import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import cartAPI from "../api/cartAPI";

/* =========================
        INITIAL STATE
========================= */

const initialState = {
  cartItems: [],
  loading: false,
};

/* =========================
        FETCH CART
========================= */

export const fetchCartItems =
  createAsyncThunk(
    "cart/fetchCartItems",
    async (_, thunkAPI) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await cartAPI.get(
            "",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        return response.data.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

/* =========================
        ADD TO CART
========================= */

export const addProductToCart =
  createAsyncThunk(
    "cart/addProductToCart",
    async (
      productId,
      thunkAPI
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await cartAPI.post(
          `/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        thunkAPI.dispatch(
          fetchCartItems()
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

/* =========================
      INCREASE QUANTITY
========================= */

export const increaseCartQuantity =
  createAsyncThunk(
    "cart/increaseCartQuantity",
    async (
      cartId,
      thunkAPI
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await cartAPI.put(
          `/increase/${cartId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        thunkAPI.dispatch(
          fetchCartItems()
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

/* =========================
      DECREASE QUANTITY
========================= */

export const decreaseCartQuantity =
  createAsyncThunk(
    "cart/decreaseCartQuantity",
    async (
      cartId,
      thunkAPI
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await cartAPI.put(
          `/decrease/${cartId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        thunkAPI.dispatch(
          fetchCartItems()
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

/* =========================
        DELETE PRODUCT
========================= */

export const deleteCartProduct =
  createAsyncThunk(
    "cart/deleteCartProduct",
    async (
      cartId,
      thunkAPI
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await cartAPI.delete(
          `/${cartId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        thunkAPI.dispatch(
          fetchCartItems()
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

/* =========================
        CLEAR CART
========================= */

export const clearAllCart =
  createAsyncThunk(
    "cart/clearAllCart",
    async (
      _,
      thunkAPI
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await cartAPI.delete(
          "/clear",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return [];

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data
        );
      }
    }
  );

/* =========================
        SLICE
========================= */

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      /* FETCH */

      .addCase(
        fetchCartItems.pending,
        (state) => {

          state.loading = true;
        }
      )

      .addCase(
        fetchCartItems.fulfilled,
        (state, action) => {

          state.loading = false;

          /* STABLE ORDER */

          state.cartItems =
            action.payload.sort(
              (a, b) =>
                a.cartId -
                b.cartId
            );
        }
      )

      .addCase(
        fetchCartItems.rejected,
        (state) => {

          state.loading = false;
        }
      )

      /* CLEAR */

      .addCase(
        clearAllCart.fulfilled,
        (state) => {

          state.cartItems = [];
        }
      );
  },
});

export default cartSlice.reducer;