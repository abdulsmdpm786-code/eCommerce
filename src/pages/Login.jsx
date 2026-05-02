import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Axios_Api from "../Api/api";
import { AuthContext } from "../Auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {isToken, setIsToken} = useContext(AuthContext)

  const handleSignIn = async () => {
    try {
      console.log("Working....");

      const signInResponse = await Axios_Api.post("/login", {
        email,
        password,
      });

      if (signInResponse.status === 200) {
        console.log("all clear...", signInResponse);
        setEmail("");
        setPassword("");

        localStorage.setItem("token", signInResponse?.data?.token);
        setIsToken(true)

        navigate("/", { replace: true });
      }
    } catch (error) {}
  };
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md relative z-10">
        {/* Decorative elements behind the card */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/40 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-500/40 rounded-full blur-2xl"></div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden">
          {/* Subtle inner reflection */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-300 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-200"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm font-medium text-slate-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              onClick={handleSignIn}
              type="button"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors mt-2"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-300">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
