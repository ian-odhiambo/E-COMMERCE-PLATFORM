import {useState} from 'react';
import {Link} from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRght, Loader } from "lucide-react";
import { motion } from "framer-motion";

import { UserPlus, Mail, Lock, User, ArrowRight, Loader } 
const SignUpPage = () => {
    const loading = true;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        confirmPassword: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        >
        
            <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400"></h2>

        </motion.div>
    </div>
  )
}

export default SignUpPage