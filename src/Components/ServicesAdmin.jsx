import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import axios from "axios"
import { useAuth } from "../Components/context/AuthContext";






export default function ServicesAdmin (){
    const {t, i18n} = useTranslation()
    const currentLang = i18n.language
    const [services, setServices] = useState([])
    const [toggle, setToggle] = useState(false);
    const [nameService, setNameService] = useState("");
    const [price, setPrice] = useState("");

    const toggleChange = () => {
        setToggle(!toggle)
    }

      const getAllSevices = async () => {
    try {
      const res = await axios.get("https://laundryar7.runasp.net/api/Laundry/GetAllServices");
      setServices(res.data); 
      
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    getAllSevices();
  }, []); 

  const delteService = async (id) => {
    try {
        const res = await axios.delete(`https://laundryar7.runasp.net/api/Laundry/DeleteServices/${id}`);
        getAllSevices();
    } catch (error) {
        console.log(error);
    }
  }

    const addNewService = async (e) => {
        e.preventDefault();

        if (!price || !nameService){
            alert(t("dashboard.messageAddNewServe"))
            return;
        }
        const data = {
            servicesName: nameService,
            unitPrice: price
        }
        try {
            const res = await axios.post("https://laundryar7.runasp.net/api/Laundry/AddServices", data);
            toggleChange();
            setNameService("")
            setPrice("")
            getAllSevices()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="">
        <div  dir={currentLang === "ar" ? "rtl" : "ltr"} className={`${toggle ? "visible" : "invisible"} transition bg-[#00000096] fixed w-full h-full top-0 left-0 z-10`}></div>
        <div className={`
           ${toggle ? " scale-100" : " scale-0"}
             transition fixed z-50  bg-[#EEE] py-9 px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[55%] w-[95%] rounded-xl`}>
           <FaXmark  onClick={toggleChange} className=" absolute top-5 right-5 cursor-pointer transition hover:text-blue-500" size={25}/>
            <h3 className="text-center text-3xl mb-5 pb-4 font-semibold">     {t("dashboard.createServe_1")}  <span className="text-blue-400">{t("dashboard.createServe_2")}</span> </h3>
            <form onSubmit={addNewService}
            className="text-center">
               <div className="mb-4 last:mb-0">
                    <input
                    className="px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"  
                    type="text" 
                    placeholder={t("dashboard.serviceName")} 
                    name="nameService"
                    value={nameService}
                    onChange={(e) => setNameService(e.target.value)}
                    />
                </div>
                <div className="mb-4 last:mb-0">
                    <input
                    className="px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"  
                    type="text" 
                    placeholder={t("dashboard.price")} 
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-500 py-3 px-4 rounded-xl text-white lg:w-28 w-full text-lg cursor-pointer mt-3"> اضافة </button>
            </form>
        </div>
        <div className="overflow-x-auto m-auto w-full " dir={currentLang === "ar" ? "rtl" : "ltr"}>
            {services.length === 0 ? 
            (<p>Not Found Services</p>)
             :
             (
            <table className="min-w-[1000px] border-spacing-0 w-full border-[2px] border-[#EEE]">
                <thead>
                    <tr>
                       <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.number")} </th>
                       <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.serviceName")}  </th>
                       <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.price")} </th>
                       <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("dashboard.operation")} </th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((ele, index) => (
                        <tr key={ele.servicesID}>
                            <td className={`p-4 text-lg text-center bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{index + 1}</td>
                            <td className={`p-4 text-lg text-center bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{ele.servicesName}</td>
                            <td className={`p-4 text-lg text-center bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{ele.unitPrice}</td>
                            <td className={`p-4 text-lg text-center bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>
                                <button 
                                onClick={() => delteService(ele.servicesID)}
                                className="bg-red-400 px-4 py-2 text-white rounded-lg cursor-pointer transition hover:bg-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             )}
        </div>
        <button onClick={() => {
            toggleChange()
        }}  className="mt-8 bg-blue-400 px-4 py-2 text-white rounded-lg cursor-pointer transition hover:bg-blue-500">{t("dashboard.createServe")}</button>
        </section>
    )
 }