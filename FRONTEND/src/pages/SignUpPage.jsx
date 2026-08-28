import {useState} from 'react';
import {Link} from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRght, Loader } from "lucide-react";
import { motion } from "framer-motion";

import { UserPlus, Mail, Lock, User, ArrowRight, Loader } 
const SignUpPage = () => {
    const loading = true;
    const [formData, setFormData] = useState({
        name:""
    })
  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage