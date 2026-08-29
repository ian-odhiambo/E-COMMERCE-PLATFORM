import {create} from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast";

const useUserStore = create((set, get) => ({
    user:null,
    loading:false,
    checkingAuth: true,

    signup: async () => {}
}))