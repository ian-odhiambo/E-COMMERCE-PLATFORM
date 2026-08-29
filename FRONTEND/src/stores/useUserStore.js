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
            return toast.terror("Passwords do not match");
        }
    },
}));