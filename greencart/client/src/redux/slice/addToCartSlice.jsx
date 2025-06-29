import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("addtocart")) || [];

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: {
    cartData: initialCart,
    count: initialCart.length
  },
  reducers: {
    addItem: (state, action) => {
      const index = state.cartData.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.cartData[index].quantity += 1;
      } else {
        state.cartData.push({ ...action.payload, quantity: 1 });
        state.count += 1;
      }
      
    },
    increment: (state, action) => {
      const index = state.cartData.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.cartData[index].quantity += 1;
      }
    },
    decrement: (state, action) => {
      const index = state.cartData.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.cartData[index].quantity -= 1;
        if (state.cartData[index].quantity <= 0) {
          state.cartData.splice(index, 1);
          // state.count -= 1;
        }
      }
    },
    removeItem: (state, action) => {
      const index = state.cartData.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.cartData.splice(index, 1);
        state.count -= 1;
      }
    },
    clearCartItem: (state,action)=>{
      state.cartData = [];
      state.count = 0;
    }
  }
});

export const { addItem, increment, decrement, removeItem , clearCartItem} = addToCartSlice.actions;
export default addToCartSlice.reducer;
