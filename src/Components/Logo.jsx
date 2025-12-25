import { Link } from "react-router-dom";




const Logo = ({loaction}) => {
    return (
    <Link to={"/"} className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
     <img 
        src="/logo.png" 
        alt="" 
        className={
            `w-28 ${loaction === "footer" ? "md:mx-0 mx-auto" : ""} lg:h-20 h-16 lg:object-cover object-contain`
        }/>
    </Link>
    );
};

export default Logo;