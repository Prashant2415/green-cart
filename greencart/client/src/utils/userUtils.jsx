import axios from "axios";

export const signUp = async(input)=>{
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/auth/signUp`,input);
    } catch (error) {
        console.log(error);
    }
}

export const signIn = async(input)=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/auth/signIn`,input);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const logout = async()=>{
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/auth/logout`,input);
    } catch (error) {
        console.log(error);
    }
}