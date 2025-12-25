import { Link, NavLink, useLocation } from "react-router-dom"
import { LuLogOut } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa6";
import { useAuth } from "./context/AuthContext";
import ButtonSwitchDark from "./ButtonSwitchDark";
import Logo from "./Logo";


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
    <header ref={reftElement} className="bg-white dark:bg-gray-900 shadow-md relative transition-colors duration-300" >
      <div className="coustom_container">
        <nav className="flex justify-between items-center py-4">
          <Logo  loaction={"home"}/>
          <ul className={`
            list-none
            ${toggle ? "flex flex-col absolute top-full left-0 w-full bg-white dark:bg-gray-900 p-6 shadow-xl z-50 animate-slideDown" : "hidden"} 
            md:flex md:flex-row md:static md:w-[60%] md:justify-between md:p-0 md:shadow-none items-center gap-6
          `}>
            {/* Navigation Links Group */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-1 items-center list-none w-full md:w-auto">
              <li className="w-full md:w-auto">
                <NavLink className={({ isActive }) =>
                  `px-4 py-1.5 rounded-xl text-xl transition-all duration-300 block text-center w-full md:w-auto ${isActive ? "bg-[#1E5FAC] text-white font-bold shadow-md" : "text-gray-600 dark:text-gray-400 font-medium hover:text-[#1E5FAC] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`
                } to={"/"}>{t("navbar.home")}</NavLink>
              </li>
              <li className="w-full md:w-auto">
                <NavLink className={({ isActive }) =>
                  `px-4 py-1.5 rounded-xl text-xl transition-all duration-300 block text-center w-full md:w-auto ${isActive ? "bg-[#1E5FAC] text-white font-bold shadow-md" : "text-gray-600 dark:text-gray-400 font-medium hover:text-[#1E5FAC] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`
                } to={"/services"}>{t("navbar.services")}</NavLink>
              </li>
              {userId && (
                <li className="w-full md:w-auto">
                  <NavLink className={({ isActive }) =>
                    `px-4 py-1.5 rounded-xl text-xl transition-all duration-300 block text-center w-full md:w-auto ${isActive ? "bg-[#1E5FAC] text-white font-bold shadow-md" : "text-gray-600 dark:text-gray-400 font-medium hover:text-[#1E5FAC] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`
                  } to={"/orders"}>{t("navbar.orders")}</NavLink>
                </li>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              {!userId ? (
                <>
                  <Link className="w-full md:w-auto text-center bg-[#1E5FAC] text-white transition py-2 px-6 rounded-full font-semibold hover:bg-[#164a8a] shadow-md" to={"/login"}>
                    {t("navbar.login")}
                  </Link>
                  <Link className="w-full md:w-auto text-center border border-[#1E5FAC] text-[#1E5FAC] dark:text-blue-400 dark:border-blue-400 transition py-2 px-6 rounded-full font-semibold hover:bg-[#1E5FAC] hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900" to={"/register"}>
                    {t("navbar.register")}
                  </Link>
                </>
              ) : (
                <button onClick={() => logout()}
                  className="w-full md:w-auto flex items-center justify-center gap-1 bg-red-50 dark:bg-red-950/30 text-red-500 transition hover:bg-red-500 hover:text-white p-2.5 px-4 rounded-full cursor-pointer border border-red-100 dark:border-red-900/50 shadow-sm"
                >
                  <LuLogOut size={20} />
                </button>
              )}

              {userType === "Admin" && (
                <Link className="w-full md:w-auto text-center bg-[#1E5FAC] text-white transition py-2 px-6 rounded-full font-normal hover:bg-[#164a8a] shadow-sm" to={"/dashboard"}>
                  {t("dashboard.dashboard")}
                </Link>
              )}

            </div>
          </ul>
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <button
              className="flex items-center gap-1 text-[#1E5FAC] dark:text-blue-400 transition hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 px-3 rounded-xl cursor-pointer font-bold"
              onClick={toggleLanguage}
            >
              <FaLanguage size={22} />
              <span className="text-sm">{currentLang === "ar" ? "EN" : "AR"}</span>
            </button>
            <ButtonSwitchDark />
            <button onClick={toggles} className="relative w-10 h-5 bg-transparent cursor-pointer md:hidden block z-50">
              <span className={`absolute transition-all duration-300 left-0 h-1 w-full bg-[#1E5FAC] rounded-sm ${toggle ? "top-2 rotate-45" : "top-0"}`}></span>
              <span className={`absolute transition-all duration-300 left-0 h-1 w-full bg-[#1E5FAC] rounded-sm ${toggle ? "top-2 opacity-0" : "top-2"}`}></span>
              <span className={`absolute transition-all duration-300 left-0 h-1 w-full bg-[#1E5FAC] rounded-sm ${toggle ? "top-2 -rotate-45" : "top-4"}`}></span>
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
}