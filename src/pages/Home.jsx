import React, { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Axios_Api from "../Api/api";

const Home = () => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  console.log(token);
  console.log("this is user",user);
  

  const fetchUser = async () => {
    console.log("working....");

    const res = await Axios_Api.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      // setIsData(!isData)
      setUser(res.data.user);
    }
    console.log(res.data.user);

    console.log("this is user", user);

  };
    useEffect(() => {
      fetchUser();
    }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      {/* Decorative blurred blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] pointer-events-none"></div>
{user?.name && <div className="mb-4">
  <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r
         from-white via-indigo-200 to-slate-400 mb-6 drop-shadow-sm leading-tight">Hello {user?.name}</span>
</div>}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-500/30
         text-indigo-300 text-sm font-semibold tracking-wider mb-6">
          NEW COLLECTION 2026
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r
         from-white via-indigo-200 to-slate-400 mb-6 drop-shadow-sm leading-tight">
          Discover the Future <br className="hidden md:block" /> of Online
          Shopping
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience a premium shopping journey with our curated selection of
          high-end products. Elevate your lifestyle with unparalleled quality
          and design.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop Now
          </button>

          <button className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-all hover:scale-105">
            View Lookbook
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/10 w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white mb-1">10k+</span>
          <span className="text-sm text-slate-400">Premium Products</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white mb-1">50k+</span>
          <span className="text-sm text-slate-400">Happy Customers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white mb-1">99%</span>
          <span className="text-sm text-slate-400">Satisfaction Rate</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white mb-1">24/7</span>
          <span className="text-sm text-slate-400">Expert Support</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
