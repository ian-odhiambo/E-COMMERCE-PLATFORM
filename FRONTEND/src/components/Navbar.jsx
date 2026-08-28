import { ShoppingCart, Userplus, Login, Logout, Lock } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {

    const 
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
        <div className="container mx-auto px-4 py-3">
            <Link to='/' className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex">
                E-Commerce
            </Link>

            <nav className="flex flex-wrap items-center gap-4">
                <Link to={"/"} className=''>Home</Link>
            </nav>
        </div>
    </header>
  )
}

export default Navbar