import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-200 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="coustom_container py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

                    {/* Brand */}
                    <div className="text-center md:text-right">
                        <Logo loaction={"footer"}/>
                        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xs mx-auto md:mx-0">
                            {t("start.description")}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex justify-center gap-8">
                        <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-[#1E5FAC] dark:hover:text-blue-400 font-medium transition-colors">
                            {t("navbar.home")}
                        </Link>
                        <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-[#1E5FAC] dark:hover:text-blue-400 font-medium transition-colors">
                            {t("navbar.services")}
                        </Link>
                    </div>

                    {/* Contact Copy moved to bottom */}
                    <div className="hidden md:block"></div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-50 dark:border-gray-800 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <span className="text-[#1E5FAC] dark:text-blue-500 font-bold">FirstClean</span> &copy; {year} - {t("footer.rights_reserved")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
