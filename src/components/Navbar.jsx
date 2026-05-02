import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isToken, setIsToken] = useState(true);
  const [isLog, setIsLog] = useState(true);

  const token = localStorage.getItem("token");
  const { isToken, setIsToken } = useContext(AuthContext);

  console.log("got the token", token);

  // useEffect(() => {
  //   if (token) {
  //     setIsToken(true);
  //   } else {
  //     setIsToken(false);
  //   }
  // }, [token]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsToken(false);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 shadow-lg transition-all duration-300">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tighter text-white hover:scale-105 transition-transform inline-block"
            >
              E-Commerce
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-slate-200 hover:text-white transition-colors relative group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-slate-200 hover:text-white transition-colors relative group py-2"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-slate-200 hover:text-white transition-colors relative group py-2"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Action Buttons */}
          {isToken ? (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                to="/cart"
                className="flex items-center text-sm font-medium text-slate-200 hover:text-white transition-colors hover:scale-105 duration-200"
              >
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                <span>Cart</span>
              </Link>
              <div className="h-4 w-px bg-white/20 mx-2"></div>

              <button
                onClick={handleLogOut}
                to="/"
                className="flex items-center rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white
                 hover:bg-white/30 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/10"
              >
                <UserPlus className="mr-1.5 h-4 w-4" />
                <span>LogOut</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                to="/cart"
                className="flex items-center text-sm font-medium text-slate-200 hover:text-white transition-colors hover:scale-105 duration-200"
              >
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                <span>Cart</span>
              </Link>
              <div className="h-4 w-px bg-white/20 mx-2"></div>

              <Link
                to="/login"
                className="flex items-center text-sm font-medium text-slate-200 hover:text-white transition-colors hover:scale-105 duration-200"
              >
                <LogIn className="mr-1.5 h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/10"
              >
                <UserPlus className="mr-1.5 h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-white transition-colors focus:outline-none p-1 rounded-md hover:bg-white/10"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6 transform transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transform transition-transform duration-300 hover:scale-110" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "max-h-96 opacity-100 scale-y-100 mt-2"
            : "max-h-0 opacity-0 scale-y-95"
        }`}
      >
        <div className="mx-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-4 shadow-xl flex flex-col space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 hover:pl-5"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 hover:pl-5"
          >
            Products
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 hover:pl-5"
          >
            Contact
          </Link>

          <div className="h-px bg-white/20 my-2"></div>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 hover:pl-5"
          >
            <ShoppingCart className="mr-3 h-5 w-5" />
            Cart
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 hover:pl-5"
          >
            <LogIn className="mr-3 h-5 w-5" />
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="flex items-center text-base font-medium text-indigo-300 hover:text-indigo-200 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 hover:pl-5"
          >
            <UserPlus className="mr-3 h-5 w-5" />
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
