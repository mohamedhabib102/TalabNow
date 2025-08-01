import { NavLink, Outlet } from 'react-router-dom';
import { FaUsers, FaCodePullRequest } from "react-icons/fa6";
import { RiProductHuntFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const DashboardLayout = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;


  return (
    <div className='flex flex-col lg:flex-row min-h-screen' dir={currentLang === "ar" ? "rtl" : "ltr"}>
      
      {/* Sidebar */}
      <nav className='bg-[#EEE] w-full lg:w-[250px] transition shadow-sm'>
        <ul className='p-2 flex lg:flex-col flex-row justify-around lg:justify-start items-center lg:items-stretch gap-2 lg:gap-0'>

          {/* Users */}
          <li className='mb-3 last:mb-0 w-full'>
            <NavLink
              to="users"
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg text-sm lg:text-lg font-semibold uppercase transition
                 hover:bg-blue-400 hover:text-white ` +
                (isActive ? "bg-blue-400 text-white" : "bg-[#EEE] text-black")
              }
            >
              <FaUsers size={22} />
              <span className='hidden lg:block'>{t("dashboard.users")}</span>
            </NavLink>
          </li>

          {/* Orders */}
          <li className='mb-3 last:mb-0 w-full'>
            <NavLink
              to="ordersAdmin"
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg text-sm lg:text-lg font-semibold uppercase transition
                 hover:bg-blue-400 hover:text-white ` +
                (isActive ? "bg-blue-400 text-white" : "bg-[#EEE] text-black")
              }
            >
              <FaCodePullRequest size={22} />
              <span className='hidden lg:block'>{t("dashboard.orders")}</span>
            </NavLink>
          </li>

          {/* Products */}
          <li className='mb-3 last:mb-0 w-full'>
            <NavLink
              to="servicesAdmin"
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg text-sm lg:text-lg font-semibold uppercase transition
                 hover:bg-blue-400 hover:text-white ` +
                (isActive ? "bg-blue-400 text-white" : "bg-[#EEE] text-black")
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
      <div className="w-full flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
