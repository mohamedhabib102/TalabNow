import { NavLink, Outlet } from 'react-router-dom';
import { FaUsers, FaCodePullRequest } from "react-icons/fa6";
import { RiProductHuntFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const DashboardLayout = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;


  return (
    <div className='flex flex-col lg:flex-row min-h-screen dark:bg-gray-800 transition-colors duration-300' dir={currentLang === "ar" ? "rtl" : "ltr"}>

      {/* Sidebar */}
      <nav className='bg-[#EEE] dark:bg-gray-900 w-full lg:w-[260px] transition-all duration-300 shadow-sm border-r dark:border-gray-800'>
        <ul className='p-3 flex lg:flex-col flex-row justify-around lg:justify-start items-center lg:items-stretch gap-3 lg:gap-2'>

          {/* Users */}
          <li className='w-full'>
            <NavLink
              to="users"
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl text-sm lg:text-lg font-bold uppercase transition-all duration-300
                 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-500 ` +
                (isActive ? "bg-blue-400 text-white shadow-md" : "bg-white/50 dark:bg-gray-800 text-gray-700 dark:text-gray-300")
              }
            >
              <FaUsers size={22} />
              <span className='hidden lg:block'>{t("dashboard.users")}</span>
            </NavLink>
          </li>

          {/* Orders */}
          <li className='w-full'>
            <NavLink
              to="ordersAdmin"
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl text-sm lg:text-lg font-bold uppercase transition-all duration-300
                 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-500 ` +
                (isActive ? "bg-blue-400 text-white shadow-md" : "bg-white/50 dark:bg-gray-800 text-gray-700 dark:text-gray-300")
              }
            >
              <FaCodePullRequest size={22} />
              <span className='hidden lg:block'>{t("dashboard.orders")}</span>
            </NavLink>
          </li>

          {/* Products */}
          <li className='w-full'>
            <NavLink
              to="servicesAdmin"
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl text-sm lg:text-lg font-bold uppercase transition-all duration-300
                 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-500 ` +
                (isActive ? "bg-blue-400 text-white shadow-md" : "bg-white/50 dark:bg-gray-800 text-gray-700 dark:text-gray-300")
              }
            >
              <RiProductHuntFill size={22} />
              <span className='hidden lg:block'>
                {t("dashboard.services")}
              </span>
            </NavLink>
          </li>

        </ul>
      </nav>

      {/* Content */}
      <div className="w-full flex-1 p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="bg-gray-50/50 dark:bg-gray-900/40 rounded-3xl p-4 min-h-full border dark:border-gray-700/50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
