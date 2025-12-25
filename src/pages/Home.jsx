import { FaShoppingCart } from "react-icons/fa";
import { FaBoxOpen, FaComments, FaLock } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext";



export default function Home() {
  const { t } = useTranslation();
  const { userId } = useAuth()
  return (

    <section className="lg:py-16 py-8">

      <h1 className="text-center text-4xl mb-4 pb-2 font-semibold dark:text-gray-100">
        {userId ? t("start.heading_logged") : t("start.heading")}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center" style={{ direction: "rtl" }}>
        {userId ? t("start.description_logged") : t("start.description")}
      </p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center max-w-4xl mx-auto">
        {[
          { id: 1, icon: <FaShoppingCart size="60%" />, title: t("features.shopping_title"), desc: t("features.shopping_desc") },
          { id: 2, icon: <FaBoxOpen size="60%" />, title: t("features.tracking_title"), desc: t("features.tracking_desc") },
          { id: 3, icon: <FaComments size="60%" />, title: t("features.chat_title"), desc: t("features.chat_desc") },
          { id: 4, icon: <FaLock size="60%" />, title: t("features.secure_title"), desc: t("features.secure_desc") },
        ].map((feat) => (
          <div key={feat.id} className="flex flex-col gap-3 items-center w-full max-w-[170px] group">
            <div className="relative w-full aspect-square bg-[#0D54A0]/10 dark:bg-blue-900/30 rounded-[30px] border-2 border-transparent transition-all duration-300 flex items-center justify-center group-hover:border-[#0D54A0] dark:group-hover:border-blue-400 group-hover:shadow-md">
              <div className="text-[#0D54A0] dark:text-blue-400 opacity-90 group-hover:scale-110 transition-transform flex items-center justify-center w-full h-full">
                {feat.icon}
              </div>
            </div>

            <div className="text-center px-2">
              <h4 className="text-[#1E5FAC] dark:text-blue-400 font-bold text-lg mb-0.5">
                {feat.title}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-tight opacity-80">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to={userId ? "/services" : "/register"}
          className="inline-block bg-[#0D54A0] hover:bg-blue-600 text-white font-bold text-lg px-10 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {userId ? t("start.button_logged") : t("features.register_now")}
        </Link>
      </div>

    </section>
  )
}