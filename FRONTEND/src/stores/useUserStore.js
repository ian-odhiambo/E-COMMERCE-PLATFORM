import {create} from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    user:null,
    loading:false,
    checkingAuth: true,

    signup: async ({name, email, password, confirmPassword}) => {
        set({ loading: true });

        if(password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try{
            const res = await axios.post("/v1/auth/signup", {name,email,password});
            set({ user: res.data.user,loading: false });
        }catch(error){
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred")
        }
    },
    login: async ({email, password}) => {
        set({ loading: true });

        try{
            const res = await axios.post("/v1/auth/login", {email,password});
            // console.log("user is here", res.data)
            set({ user: res.data, loading: false });
        }catch(error){
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred")
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });
        try{
            const response = await axios.get("/v1/auth/profile");
            set({ user: response.data, checkingAuth: false });
        }catch(error){
            set({ checkingAuth: false, user: null });
        }
    }
}));
