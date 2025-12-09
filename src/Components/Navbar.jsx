import { Link, NavLink, useLocation } from "react-router-dom"
import { LuLogOut } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa6";
import { useAuth } from "./context/AuthContext";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const { userId, logout, userType } = useAuth();
  const reftElement = useRef(null);


  const toggles = () => {
    setToggle(!toggle);
  };

  const { t, i18n } = useTranslation()

  const currentLang = i18n.language;
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    setToggle(false);
  }, [location.pathname]);



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (reftElement.current && !reftElement.current.contains(e.target) && toggle) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <header ref={reftElement} className="bg-white shadow-md relative" dir={currentLang == "ar" ? "rtl" : "ltr"}>
      <div className="coustom_container">
        <nav className="flex justify-between items-center py-4">
          <Link to={"/"} className="text-2xl font-bold text-gray-800"><span className="text-[35px] text-[#1E5FAC]">First</span>Clean</Link>
          <ul className={`${toggle ? "show" : "hidden"} items-center gap-3 md:flex w-[60%] justify-between z-40`}>
            <div className="flex gap-2">
              <li className={`${currentLang === "ar" ? "lg:mr-2 last:mr-0" : "lg:ml-2 last:ml-0"}`}><NavLink className={({ isActive }) =>
                `${isActive ? "text-[#1E5FAC] font-bold" : "text-gray-600 font-medium hover:text-[#1E5FAC]"} text-xl transition-colors duration-300`
              } to={"/"}>{t("navbar.services")}</NavLink></li>
              {userId ? (
                <li className={`${currentLang === "ar" ? "lg:mr-2 last:mr-0" : "lg:ml-2 last:ml-0"}`}><NavLink className={({ isActive }) =>
                  `${isActive ? "text-[#1E5FAC] font-bold" : "text-gray-600 font-medium hover:text-[#1E5FAC]"} text-xl transition-colors duration-300`
                } to={"/orders"}>{t("navbar.orders")}</NavLink></li>
              ) : ""}
            </div>
            <div className={`flex items-center gap-4`}>
              {
                !userId ?
                  (
                    <>
                      <Link className={`${toggle ? "w-full text-center" : ""} bg-[#1E5FAC] text-white transition py-2 px-5 rounded-full font-semibold hover:bg-[#164a8a] shadow-sm`} to={"/login"}>{t("navbar.login")}</Link>
                      <Link className={`${toggle ? "w-full text-center" : ""} border border-[#1E5FAC] text-[#1E5FAC] transition py-2 px-5 rounded-full font-semibold hover:bg-[#1E5FAC] hover:text-white`} to={"/register"}>{t("navbar.register")}</Link>
                    </>
                  )
                  :
                  <button onClick={() => logout()}
                    className="flex items-center gap-1 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white p-2 px-3 rounded-full cursor-pointer border border-red-100"><LuLogOut size={20} /></button>
              }
              {
                userType === "Admin" ? (
                  <Link className={`${toggle ? "w-full text-center" : ""} bg-[#1E5FAC] text-white transition py-2 px-5 rounded-full font-normal hover:bg-[#164a8a]`} to={"/dashboard"}>{t("dashboard.dashboard")}</Link>
                ) : ""
              }
              <button
                className="flex items-center gap-1 text-[#1E5FAC] transition hover:bg-blue-50 p-2 px-3 rounded-full cursor-pointer font-bold"
                onClick={toggleLanguage}>
                <FaLanguage size={20} />
                {currentLang === "ar" ? "EN" : "AR"}
              </button>
            </div>
          </ul>
          {/* <LuLogOut size={20}/> */}


          <button onClick={toggles} className="relative w-10 h-5 bg-transparent cursor-pointer md:hidden block">
            <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2 rotate-45" : "top-0"}`}></span>
            <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2  opacity-0" : "top-2"}`}></span>
            <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2 -rotate-45" : "top-4"}`}></span>
          </button>
        </nav>
      </div>
    </header>
  )
}