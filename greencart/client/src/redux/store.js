import { configureStore } from "@reduxjs/toolkit"
import shopReducer from "../redux/slice/shopSlice"
import addToCartReducer from "../redux/slice/addToCartSlice"
import userReducer from "../redux/slice/userSlice"
export const store = configureStore({
    reducer:{
        shopReducer: shopReducer,
        addToCartReducer: addToCartReducer,
        userReducer: userReducer
    }
})