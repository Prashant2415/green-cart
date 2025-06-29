import axios from "axios";

export const orderBilling = async(userId)=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/billing/billing/${userId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}