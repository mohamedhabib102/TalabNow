import { Link, NavLink, useLocation } from "react-router-dom"
import { LuLogOut } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa6";
import { useAuth } from "./context/AuthContext";

export default function Navbar(){
    const [toggle, setToggle] = useState(false);
    const { userId, logout, userType } =  useAuth()


    const toggles = () => {
      setToggle(!toggle); 
    };

    const {t,i18n} = useTranslation()

    const currentLang = i18n.language;
    const location = useLocation();

    const toggleLanguage = () => {
       const newLang = currentLang === "ar" ? "en" : "ar";
       i18n.changeLanguage(newLang);
     };

    useEffect(() => {
    setToggle(false);
    }, [location.pathname]);


    return (
        <header className="bg-[#EEE] relative" dir={currentLang == "ar" ? "rtl" : "ltr"}>
          <div className="coustom_container">
               <nav className="flex justify-between items-center py-4">
                   <Link to={"/"} className="text-2xl"><span className="text-[35px] text-blue-400">Tal</span>abNow</Link>
                   <ul className={`${toggle ? "show" : "hidden"} items-center gap-3 md:flex w-[60%] justify-between`}>
                        <div className="flex">
                           <li className={`${currentLang === "ar" ? "lg:mr-2 last:mr-0" : "lg:ml-2 last:ml-0"}`}><NavLink   className={({ isActive }) =>
                           `${isActive ? "bg-white text-blue-400" : ""} p-3 rounded-lg`
                             } to={"/"}>{t("navbar.services")}</NavLink></li>
                             {userId ? (
                                 <li className={`${currentLang === "ar" ? "lg:mr-2 last:mr-0" : "lg:ml-2 last:ml-0"}`}><NavLink className={({ isActive }) =>
                                `${isActive ? "bg-white text-blue-400" : ""} p-3 rounded-lg`
                                 }  to={"/orders"}>{t("navbar.orders")}</NavLink></li>
                              ) : ""}
                        </div>
                        <div className={`flex items-center gap-4`}>
                           {
                            !userId ? 
                            (
                             <>
                            <Link className={`${toggle ? "w-full text-center" : ""} bg-blue-400 text-white transition py-2 px-3 rounded-lg font-normal hover:bg-blue-600`} to={"/login"}>{t("navbar.login")}</Link>
                            <Link className={`${toggle ? "w-full text-center" : ""} bg-blue-400 text-white transition py-2 px-3 rounded-lg font-normal hover:bg-blue-600`} to={"/register"}>{t("navbar.register")}</Link>
                             </>
                            ) 
                            :
                            <button onClick={() => logout()}
                            className="flex items-center gap-1 bg-blue-400 transition hover:bg-blue-600 text-white p-2 rounded-lg cursor-pointer"><LuLogOut size={20}/></button>
                           }
                           {
                            userType === "Admin" ? (
                              <Link className={`${toggle ? "w-full text-center" : ""} bg-blue-400 text-white transition py-2 px-3 rounded-lg font-normal hover:bg-blue-600`}  to={"/dashboard"}>{t("dashboard.dashboard")}</Link>
                            ) : ""
                           }
                           <button
                           className="flex items-center gap-1 bg-blue-400 transition hover:bg-blue-600 text-white p-2 rounded-lg cursor-pointer"  
                           onClick={toggleLanguage}>
                            <FaLanguage size={20}/>
                            {currentLang === "ar" ? "EN" : "AR"}
                           </button>
                        </div>
                   </ul>
                   {/* <LuLogOut size={20}/> */}


                   <button onClick={toggles}  className="relative w-10 h-5 bg-white cursor-pointer md:hidden block custom-rounded">
                      <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2 rotate-45" : "top-0"}`}></span>
                      <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2  opacity-0" : "top-2"}`}></span>
                      <span className={`absolute  transition left-0 h-1 w-full bg-blue-400 rounded-sm ${toggle ? "top-2 -rotate-45" : "top-4"}`}></span>
                   </button>
               </nav>
          </div>
        </header>
    )
}