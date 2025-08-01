import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useAuth } from "./context/AuthContext";

export default function OrdersAdmin() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [orders, setOrders] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [statusOrder, setStatusOrder] = useState("");
  const [messageOrder, setMessageOrder] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const getAllOrders = async () => {
    try {
      const res = await axios.get("https://laundryar7.runasp.net/api/Laundry/GetAllOrder");
      setOrders(res.data); 
      
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

      const toggleChange = () => {
        setToggle(!toggle)
    }

    const handleChangeStatus = async (e) => {
      e.preventDefault();
    
      if (!statusOrder) {
        alert(t("dashboard.messageChange"));
        return;
      }
    
      try {
        const res = await axios.put(`https://laundryar7.runasp.net/api/Laundry/UpdateStatus`, {
          orderId: currentOrderId,
          status: statusOrder,
          regectionReason: messageOrder,
        });
    
        setOrders(prev =>
          prev.map(order =>
            order.orderID === currentOrderId
              ? { ...order, orderStatus: statusOrder }
              : order
          )
        );
    
        toggleChange();
        setStatusOrder("");
        setMessageOrder("");
        setCurrentOrderId(null);
      } catch (err) {
        console.log("Error updating status:", err);
      }
    };



  return (
    <section>
          <div  dir={currentLang === "ar" ? "rtl" : "ltr"} className={`${toggle ? "visible" : "invisible"} transition bg-[#00000096] fixed w-full h-full top-0 left-0 z-10`}></div>
        <div className={`
           ${toggle ? " scale-100" : " scale-0"}
             transition fixed z-50  bg-[#EEE] py-9 px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[55%] w-[95%] rounded-xl`}>
           <FaXmark  onClick={toggleChange} className=" absolute top-5 right-5 cursor-pointer transition hover:text-blue-500" size={25}/>
            <h3 className="text-center text-3xl mb-5 pb-4 font-semibold">    تعديل حالة <span className="text-blue-400">الطلب</span> </h3>
            <form 
            onSubmit={handleChangeStatus}
            className="text-center">
               <div className="mb-4 last:mb-0">
                    <input
                    className="px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"  
                    type="text" 
                    id="order"
                    placeholder={t("dashboard.orderStatus")} 
                    name="statusOrder"
                    value={statusOrder}
                    onChange={(e) => setStatusOrder(e.target.value)}
                    />
                </div>
                <div className="mb-4 last:mb-0">
                    <input
                    className="px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"  
                    type="text" 
                    id="message" 
                    placeholder={t("dashboard.messageOrder")} 
                    name="messageOrder"
                    value={messageOrder}
                    onChange={(e) => setMessageOrder(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-500 py-3 px-4 rounded-xl text-white lg:w-28 w-full text-lg cursor-pointer mt-3"> تعديل </button>
            </form>
        </div>
      <div className="overflow-x-auto m-auto w-full" dir={currentLang === "ar" ? "rtl" : "ltr"}>
        {orders.length === 0 ? (
          <p className="text-center py-10 text-lg text-gray-500">{t("dashboard.notFoundOrders") || "Not Found Orders"}</p>
        ) : (
          <table className="min-w-[1000px] border-spacing-0 w-full border-[2px] border-[#EEE]">
            <thead>
              <tr>
                <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>#</th>
                <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("dashboard.name")}</th>
                <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("dashboard.phoneNumber")}</th>
                <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("dashboard.address")}</th>
                <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("dashboard.status")}</th>
                <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("dashboard.orderDate")}</th>
                <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("dashboard.services")}</th>
                <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}>{t("dashboard.changeStatus")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.orderID}>
                  <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{index + 1}</td>
                  <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{order.personName}</td>
                  <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{order.phoneNumberPlus}</td>
                  <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{order.addressPlus}</td>
                  <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{order.orderStatus}</td>
                  <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>
                    <ul className="text-lg">
                      {order.services.map((service, i) => (
                        <li key={i}>
                          {service.serviceName} × {service.quantity} = {service.subTotal} ج.م
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>
                    <button className="bg-blue-400 px-4 py-2 text-white rounded-lg cursor-pointer transition hover:bg-blue-500"
                     onClick={() => {
                      toggleChange()
                      setCurrentOrderId(order.orderID)
                     }}>Change</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
