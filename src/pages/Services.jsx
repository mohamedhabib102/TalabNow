import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import axios from "axios"
import { useAuth } from "../Components/context/AuthContext";
import { 
  FaShoppingCart, 
  FaBoxOpen, 
  FaComments, 
  FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Services (){
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState("")
    const { t, i18n } = useTranslation();
    const {userId} = useAuth()
    const [message, setMessage] = useState("")

    useEffect(() => {
      getAllServces()
    }, [])

    const getAllServces = async () => {
      try {
        const res = await axios.get("https://laundryar7.runasp.net/api/Laundry/GetAllServices");
        const data = res.data.map((item) => ({
          ...item, quantity: 1,
        }));
        setServices(data)
      } catch (error) {
        console.log(error);
      }
    }

    const currentLang = i18n.language;
    const toggleChange = () => {
        setToggle(!toggle)
    }

    const handleQuantityChange = (id, type) => {
      const updatedServices = services.map((item) => {
        if (item.servicesID === id) {
          const newQuantity = type === "inc"
            ? item.quantity + 1
            : item.quantity > 1
            ? item.quantity - 1
            : 1;

            const newTotalPrice = item.unitPrice * newQuantity;
    
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newTotalPrice,
          };
        }
        return item;
      });
    
      setServices(updatedServices);
    };

    const handelAllTotal = () => {
      const total = services
        .filter((service) => selectedServices.includes(service.servicesID))
        .reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
      return total;
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      const selected = services.filter(serv => selectedServices.includes(serv.servicesID));

      const payload = {
        personId: parseFloat(userId),
        phoneNumberPlus: phone,
        addressPlus: address,
        totalAmount: handelAllTotal(),
        services: selected.map((ele) => ({
          servicesID: ele.servicesID,
          quantity: ele.quantity,
          unitPrice: ele.unitPrice
        }))
      };

      try {
        const res = await axios.post("https://laundryar7.runasp.net/api/Laundry/CreateOrder", payload);
        setPhone("")
        setAddress("")
        setToggle(!toggle);
        setMessage("✅ Service added successfully!")
        setSelectedServices([])
      } catch (error) {
        console.log(error);
      }
    }

    const handelMessage =  () => {
      setTimeout(() => {
        setMessage("")
      }, 1900)
    }

    return (
        <>
        <div  dir={currentLang === "ar" ? "rtl" : "ltr"} className={`${toggle ? "visible" : "invisible"} transition bg-[#00000096] fixed w-full h-full top-0 left-0 z-10`}></div>
        <p className={`${message ? " visible opacity-100 translate-y-0" : " invisible opacity-0 -translate-y-5"} 
        duration-200  fixed top-28 left-1/2 -translate-x-1/2 bg-blue-400 text-white font-bold p-4 rounded-xl`}>{message ? message : ""}</p>
        <div className={`
           ${toggle ? " scale-100" : " scale-0"}
             transition fixed z-50  bg-[#EEE] py-9 px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[55%] w-[95%] rounded-xl`}>
           <FaXmark  onClick={toggleChange} className=" absolute top-5 right-5 cursor-pointer transition hover:text-blue-500" size={25}/>
            <h3 className="text-center text-3xl mb-5 pb-4 font-semibold">   إنشاء طلب ج<span className="text-blue-400">ديد</span> </h3>
            <form 
            onSubmit={handleSubmit}
            className="text-center">
               <div className="mb-4 last:mb-0">
                    <input
                    className="px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"  
                    type="text" 
                    id="userPhone" 
                    placeholder=" رقم الهاتف " 
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4 last:mb-0">
                    <input
                    className="px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"  
                    type="text" 
                    id="add" 
                    placeholder=" العنوان " 
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button onClick={handelMessage} type="submit" className="bg-blue-500 py-3 px-4 rounded-xl text-white lg:w-28 w-full text-lg cursor-pointer mt-3">  ارسال </button>
            </form>
        </div>
        <div className="coustom_container">
        <div className="py-16">
         {userId ? (<h3 className="text-center text-4xl mb-6 pb-6 font-semibold" >  الخدمات  Servic<span className="text-blue-500">es</span> </h3>) : 
         (
          <>
          <h1 className="text-center text-4xl mb-4 pb-2 font-semibold">{t("start.heading")}</h1>
          <p className="text-lg text-gray-700 mb-6 text-center" style={{direction: "rtl"}}>{t("start.description")}</p>
          </>
         )}
        <section className="overflow-x-auto m-auto w-full " dir={currentLang === "ar" ? "rtl" : "ltr"}>
          {userId ? (
      <div className="w-full">
         {/* Mobile */}
         <div className="grid gap-4 lg:hidden">
           {services.map((ele, index) => (
             <div key={ele.servicesID} className="bg-[#f9f9f9] rounded-lg p-4 shadow border border-[#eee]">
               <p className="flex items-center gap-2 mb-3 last:mb-0"><strong className="bg-[#EEE] px-4 text-blue-400 py-3 rounded-lg">{t("orders.number")}:</strong> <span>{index + 1}</span></p>
               <p className="flex items-center gap-2 mb-3 last:mb-0"><strong className="bg-[#EEE] px-4 text-blue-400 py-3 rounded-lg">{t("orders.serviceName")}:</strong> <span>{ele.servicesName}</span></p>
               <p className="flex items-center gap-2 mb-3 last:mb-0"><strong className="bg-[#EEE] px-4 text-blue-400 py-3 rounded-lg">{t("orders.price")}:</strong> <span>{ele.unitPrice} ج.م</span> </p>
               <p className="flex items-center gap-2 mb-3 last:mb-0"><strong className="bg-[#EEE] px-4 text-blue-400 py-3 rounded-lg">{t("orders.select")}:</strong>
                 <input 
                   name="checked"
                   className="ml-2 cursor-pointer h-5 w-5"
                   type="checkbox"
                   onChange={() => {
                     if (selectedServices.includes(ele.servicesID)) {
                       setSelectedServices(prev => prev.filter(id => id !== ele.servicesID));
                     } else {
                       setSelectedServices(prev => [...prev, ele.servicesID]);
                     }
                   }}
                   checked={selectedServices.includes(ele.servicesID)}
                 />
               </p>
               <p className="flex items-center gap-2 mb-3 last:mb-0"><strong className="bg-[#EEE] px-4 text-blue-400 py-3 rounded-lg">{t("orders.quantity")}:</strong>
                 <button onClick={() => {
                   handleQuantityChange(ele.servicesID, "dec");
                   handelAllTotal();
                 }} className="bg-blue-400 mx-2 py-1 px-3 text-white rounded hover:bg-blue-500 transition">
                   <FaMinus />
                 </button>
                 {ele.quantity}
                 <button onClick={() => {
                   handleQuantityChange(ele.servicesID, "inc");
                   handelAllTotal();
                 }} className="bg-blue-400 mx-2 py-1 px-3 text-white rounded hover:bg-blue-500 transition">
                   <FaPlus />
                 </button>
               </p>
               <p className="flex items-center gap-2 mb-3 last:mb-0"><strong className="bg-[#EEE] px-4 text-blue-400 py-3 rounded-lg">{t("orders.total")}:</strong> {ele.totalPrice || ele.unitPrice} ج.م</p>
             </div>
           ))}
         </div>

       {/*  Lalbtop And PC  */}
      <table className="min-w-[1000px] border-spacing-0 w-full border-[2px] border-[#EEE] hidden lg:table">
        <thead>
          <tr>
            <th className={`lg:p-4 bg-[#EEE] text-blue-400 font-bold lg:text-[20px] text-[16px] p-2 ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("orders.number")}</th>
            <th className={`lg:p-4 bg-[#EEE] text-blue-400 font-bold lg:text-[20px] text-[16px] p-2 ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("orders.serviceName")}</th>
            <th className={`lg:p-4 bg-[#EEE] text-blue-400 font-bold lg:text-[20px] text-[16px] p-2 ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("orders.price")}</th>
            <th className={`lg:p-4 bg-[#EEE] text-blue-400 font-bold lg:text-[20px] text-[16px] p-2 ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("orders.select")}</th>
            <th className={`lg:p-4 bg-[#EEE] text-blue-400 font-bold lg:text-[20px] text-[16px] p-2 ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("orders.quantity")}</th>
            <th className={`lg:p-4 bg-[#EEE] text-blue-400 font-bold lg:text-[20px] text-[16px] p-2 ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("orders.total")}</th>
          </tr>
        </thead>
        <tbody>
          {services.map((ele, index) => (
            <tr key={ele.servicesID}>
              <td className="lg:p-4 text-center border-b-2 border-[#eee]">{index + 1}</td>
              <td className="lg:p-4 text-center border-b-2 border-[#eee]">{ele.servicesName}</td>
              <td className="lg:p-4 text-center border-b-2 border-[#eee]">{ele.unitPrice} ج.م</td>
              <td className="lg:p-4 text-center border-b-2 border-[#eee]">
                <input
                  name="checked"
                  className="cursor-pointer h-6 w-5"
                  type="checkbox"
                  onChange={() => {
                    if (selectedServices.includes(ele.servicesID)) {
                      setSelectedServices(prev => prev.filter(id => id !== ele.servicesID));
                    } else {
                      setSelectedServices(prev => [...prev, ele.servicesID]);
                    }
                  }}
                  checked={selectedServices.includes(ele.servicesID)}
                />
              </td>
              <td className="lg:p-4 text-center border-b-2 border-[#eee]">
                <button onClick={() => {
                  handleQuantityChange(ele.servicesID, "dec");
                  handelAllTotal();
                }} className="bg-blue-400 py-2 px-3 rounded-lg text-white hover:bg-blue-500 transition"><FaMinus /></button>
                <span className="inline-block px-2">{ele.quantity}</span>
                <button onClick={() => {
                  handleQuantityChange(ele.servicesID, "inc");
                  handelAllTotal();
                }} className="bg-blue-400 py-2 px-3 rounded-lg text-white hover:bg-blue-500 transition"><FaPlus /></button>
              </td>
              <td className="lg:p-4 text-center border-b-2 border-[#eee]">{ele.totalPrice || ele.unitPrice} ج.م</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

          ) : (

             <>
          <div className="mt-7 grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <div className="bg-[#eee] p-6 rounded-xl shadow text-center">
            <FaShoppingCart size={40} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t("features.shopping_title")}</h3>
            <p className="text-gray-600">{t("features.shopping_desc")}</p>
          </div>

          <div className="bg-[#eee] p-6 rounded-xl shadow text-center">
            <FaBoxOpen size={40} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t("features.tracking_title")}</h3>
            <p className="text-gray-600">{t("features.tracking_desc")}</p>
          </div>

          <div className="bg-[#eee] p-6 rounded-xl shadow text-center">
            <FaComments size={40} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t("features.chat_title")}</h3>
            <p className="text-gray-600">{t("features.chat_desc")}</p>
          </div>

          <div className="bg-[#eee] p-6 rounded-xl shadow text-center">
            <FaLock size={40} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{t("features.secure_title")}</h3>
            <p className="text-gray-600">{t("features.secure_desc")}</p>
          </div>
        </div>
        <div className="text-center mt-10">
            <Link
              to="/register"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-md transition duration-300"
            >
              {t("features.register_now")}
            </Link>
        </div>

             </>

          )}
        </section>
        <div className="mt-6 pt-4 flex lg:flex-row flex-col lg:gap-0 gap-3 justify-between items-center">
        {userId ? (
          <>
          <p className="lg:text-right lg:w-36 w-full text-center bg-blue-500 cursor-pointer transition hover:bg-blue-400 text-white font-semibold p-3 rounded-lg">{t("orders.allTotal")}: <span>{handelAllTotal()} ج.م</span></p>
          <button
          className={`block   ${selectedServices.length > 0 ? "visible" : "invisible"} lg:text-right lg:w-36 w-full text-center bg-blue-500 transition text-white py-3 px-5 rounded-xl cursor-pointer text-lg hover:bg-blue-400`}
          onClick={() => {
              toggleChange()
          }}
          > {t("orders.create")}</button>
          </>
        ) : ""}
        </div>
        </div>
        </div>
        </>
    )
}
