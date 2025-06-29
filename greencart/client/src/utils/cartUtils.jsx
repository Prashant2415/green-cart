import axios from "axios";

export const cartDetails = async(input)=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/cart/addToCart`,input,{withCredentials: true});
    } catch (error) {
        console.log(error);
    }
}