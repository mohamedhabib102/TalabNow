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
  FaLock
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";


export default function Services() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("")
  const { t, i18n } = useTranslation();
  const { userId } = useAuth()
  const [message, setMessage] = useState("")

  useEffect(() => {
    getAllServces()
  }, [])

  const ACTIONS = {
    INC: "INCREMENT",
    DEC: "DECREMENT"
  };


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
        const newQuantity = type === 1
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
    console.log(id, type);

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
      setMessage(currentLang === "ar" ? "تم إضافة الخدمة بنجاح" : "Service added successfully!")
      setSelectedServices([])
    } catch (error) {
      console.log(error);
    }
  }

  const handelMessage = () => {
    setTimeout(() => {
      setMessage("")
    }, 1900)
  }

  return (
    <>
      <div dir={currentLang === "ar" ? "rtl" : "ltr"} className={`${toggle ? "visible" : "invisible"} transition bg-[#00000096] fixed w-full h-full top-0 left-0 z-40 backdrop-blur-sm`}></div>
      <p className={`${message ? " visible opacity-100 translate-y-0" : " invisible opacity-0 -translate-y-5"} 
        duration-200  fixed top-28 left-1/2 -translate-x-1/2 bg-blue-400 text-white font-bold p-4 rounded-xl`}>{message ? message : ""}</p>
      <div className={`
           ${toggle ? " scale-100" : " scale-0"}
             transition fixed z-50  bg-[#EEE] py-9 px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[55%] w-[95%] rounded-xl`}>
        <FaXmark onClick={toggleChange} className=" absolute top-5 right-5 cursor-pointer transition hover:text-blue-500" size={25} />
        <h3 className="text-center text-3xl mb-5 pb-4 font-semibold"> {t("orders.create")} </h3>
        <form
          onSubmit={handleSubmit}
          className="text-center">
          <div className="mb-4 last:mb-0">
            <label htmlFor="userPhone" className={`block text-lg font-semibold mb-2 ${currentLang === "ar" ? "text-right" : "text-left"}`}>{t("auth.phone")}</label>
            <input
              className={`px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none ${currentLang === "ar" ? "text-right" : "text-left"}`}
              type="text"
              id="userPhone"
              placeholder={t("auth.phone")}
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4 last:mb-0">
            <label htmlFor="add" className={`block text-lg font-semibold mb-2 ${currentLang === "ar" ? "text-right" : "text-left"}`}>{t("auth.address")}</label>
            <input
              className={`px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none ${currentLang === "ar" ? "text-right" : "text-left"}`}
              type="text"
              id="add"
              placeholder={t("auth.address")}
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
          {userId ? (<h3 className="text-center text-4xl mb-6 pb-6 font-semibold text-[#1E5FAC]" >  الخدمات  Servic<span className="">es</span> </h3>) :
            (
              <>
                <h1 className="text-center text-4xl mb-4 pb-2 font-semibold">{t("start.heading")}</h1>
                <p className="text-lg text-gray-700 mb-6 text-center" style={{ direction: "rtl" }}>{t("start.description")}</p>
              </>
            )}
          <section className="m-auto w-full " >
            {userId ? (
              <div className="w-full">
                <div className="grid grid-cols-1  min-[1400px]:grid-cols-4 lg:grid-cols-3  gap-6">
                  {services.map((ele) => (
                    <div key={ele.servicesID} className="relative bg-gradient-to-br from-[#0D54A0] via-[#4E88C8] to-[#ECECEC] 
                 rounded-[45px] p-7 shadow-[10px_11px_4px_rgb(0_0_0/25%)]">
                      <div className="bg-[#CFE2F8] rounded-[25px] pt-8 p-3 h-full relative">

                        {/* Selection Checkbox */}
                        <div className="absolute top-2 right-4 flex flex-col items-center z-10">
                          <span className="text-[#1E5FAC] text-xs font-bold mb-1">{t("orders.select")}</span>
                          <input
                            name="checked"
                            id={`service-${ele.servicesID}`}
                            className="peer hidden"
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
                          <label
                            htmlFor={`service-${ele.servicesID}`}
                            className="
                              w-7 h-7 rounded-xl bg-white border-2 border-white shadow-sm
                              flex items-center justify-center cursor-pointer
                              transition-all duration-300
                              peer-checked:bg-[#1E5FAC] peer-checked:border-[#1E5FAC]
                            "
                          >
                            <FaCheck size={14} className="text-white peer-checked:opacity-100 transition-opacity" />
                          </label>
                        </div>

                        {/* Title */}
                        <div className="mt-8 mb-6 flex justify-center">
                          <p className="px-6 py-3 bg-white rounded-full shadow-md text-[#1E5FAC] font-bold text-lg text-center min-w-[160px]">
                            {ele.servicesName}
                          </p>
                        </div>

                        {/* Rows Container */}
                        <div className="space-y-4 px-2">

                          {/* Price Row */}
                          <div className="flex items-center gap-1 justify-between">
                            <span className="bg-white text-[#1E5FAC] px-4 py-1.5 rounded-full font-bold shadow-sm min-w-[90px] text-center order-last">
                              {t("orders.price")}
                            </span>
                            <span className="bg-white text-[#1E5FAC] px-1 py-1.5 rounded-full font-bold shadow-sm min-w-[90px] text-center">
                              {ele.unitPrice} {currentLang === "ar" ? "ج.م" : "EGP"}
                            </span>
                          </div>

                          {/* Quantity Row */}
                          <div className="flex items-center gap-2 justify-between !my-6">
                            <span className="bg-white text-[#1E5FAC] px-4 py-1.5 rounded-full font-bold shadow-sm min-w-[90px] text-center order-last">
                              {t("orders.quantity")}
                            </span>
                            <div className="flex items-center" dir="ltr">
                              <button onClick={() => {
                                handleQuantityChange(ele.servicesID, -1);
                                handelAllTotal();
                              }}
                                className="w-8 h-8 flex items-center justify-center bg-white text-[#1E5FAC] rounded-full shadow-sm hover:bg-blue-50 transition">
                                <FaMinus size={12} />
                              </button>
                              <span className="text-[#1E5FAC] font-bold text-center mx-1 text-lg">{ele.quantity}</span>
                              <button onClick={() => {
                                handleQuantityChange(ele.servicesID, 1);
                                handelAllTotal();
                              }}
                                className="w-8 h-8 flex items-center justify-center bg-white text-[#1E5FAC] rounded-full shadow-sm hover:bg-blue-50 transition">
                                <FaPlus size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Total Price */}
                          <div className="flex items-center gap-2 justify-between !mb-7">
                            <span className="bg-white text-[#1E5FAC] px-4 py-1.5 rounded-full font-bold shadow-sm min-w-[90px] text-center order-last">
                              {t("orders.total")}
                            </span>
                            <span className="bg-white text-[#1E5FAC] px-4 py-1.5 rounded-full font-bold shadow-sm min-w-[90px] text-center">
                              <span className={`
                                  ${currentLang === "ar" ? "ml-1" : "mr-1"}
                                  `}>{ele.totalPrice || ele.unitPrice}</span>
                              {currentLang === "ar" ? "ج.م" : "EGP"}
                            </span>
                          </div>

                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

            ) : (

              <>
                <div className="mt-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                  {/* Shopping */}
                  <div className="relative rounded-3xl shadow-[10px_11px_4px_rgb(0_0_0/25%)]">
                    <div className="bg-gradient-to-br from-[#0D54A0] via-[#4E88C8] to-[#ECECEC] 
                                    rounded-3xl p-5 overflow-hidden">
                      <div className="bg-[#CFE2F8] rounded-[25px] pt-8 p-3 h-full relative text-center">
                        <FaShoppingCart size={40} className="text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{t("features.shopping_title")}</h3>
                        <p className="text-gray-600">{t("features.shopping_desc")}</p>
                      </div>
                    </div>
                  </div>
                
                  {/* Tracking */}
                  <div className="relative rounded-3xl shadow-[10px_11px_4px_rgb(0_0_0/25%)]">
                    <div className="bg-gradient-to-br from-[#0D54A0] via-[#4E88C8] to-[#ECECEC] 
                                    rounded-3xl p-5 overflow-hidden">
                      <div className="bg-[#CFE2F8] rounded-[25px] pt-8 p-3 h-full relative text-center">
                        <FaBoxOpen size={40} className="text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{t("features.tracking_title")}</h3>
                        <p className="text-gray-600">{t("features.tracking_desc")}</p>
                      </div>
                    </div>
                  </div>
                
                  {/* Chat */}
                  <div className="relative rounded-3xl shadow-[10px_11px_4px_rgb(0_0_0/25%)]">
                    <div className="bg-gradient-to-br from-[#0D54A0] via-[#4E88C8] to-[#ECECEC] 
                                    rounded-3xl p-5 overflow-hidden">
                      <div className="bg-[#CFE2F8] rounded-[25px] pt-8 p-3 h-full relative text-center">
                        <FaComments size={40} className="text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{t("features.chat_title")}</h3>
                        <p className="text-gray-600">{t("features.chat_desc")}</p>
                      </div>
                    </div>
                  </div>
                
                  {/* Secure */}
                  <div className="relative rounded-3xl shadow-[10px_11px_4px_rgb(0_0_0/25%)]">
                    <div className="bg-gradient-to-br from-[#0D54A0] via-[#4E88C8] to-[#ECECEC] 
                                    rounded-3xl p-5 overflow-hidden">
                      <div className="bg-[#CFE2F8] rounded-[25px] pt-8 p-3 h-full relative text-center">
                        <FaLock size={40} className="text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{t("features.secure_title")}</h3>
                        <p className="text-gray-600">{t("features.secure_desc")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-10">
                  <Link
                    to="/register"
                    className="inline-block bg-[#0D54A0] hover:bg-blue-600 text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-md transition duration-300"
                  >
                    {t("features.register_now")}
                  </Link>
                </div>

              </>

            )}
          </section>
          <div className="mt-10 pt-4 flex flex-col justify-center items-center gap-6">
            {userId ? (
              <div className="flex items-center lg:flex-row flex-col gap-8">
                <div className="bg-[#0D54A0] text-white text-2xl font-bold py-3 px-12 rounded-full shadow-lg flex items-center justify-center gap-4 min-w-[300px]">
                  <span>{t("orders.allTotal")}</span>
                  <span>{handelAllTotal()} {currentLang === "ar" ? "ج.م" : "EGP"}</span>
                </div>

                <button
                  className={`block ${selectedServices.length > 0 ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-300 bg-[#0D54A0] text-white text-2xl font-bold py-3 px-12 rounded-full shadow-lg flex items-center justify-center gap-4 min-w-[300px]`}
                  onClick={() => {
                    toggleChange()
                  }}
                > {t("orders.create")}</button>
              </div>
            ) : ""}
          </div>
        </div>
      </div>
    </>
  )
}
