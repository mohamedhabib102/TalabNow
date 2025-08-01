import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Components/context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const { userId } = useAuth();
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("")
  const [loadingOrderId, setLoadingOrderId] = useState(null);


  const getAllOrders = async () => {
     const id = parseFloat(userId);
    try {
      const res = await axios.get(`https://laundryar7.runasp.net/api/Laundry/GetOrderByID/${id}`);
      setOrders(Array.isArray(res.data) ? res.data : [res.data]);  
        console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    getAllOrders();
  }, [userId]);

      const currentLang = i18n.language;
    
        const handleChangeStatus = async (orderId, currentStatus = "Cancel") => {
        try {
          const  res = await axios.put(`https://laundryar7.runasp.net/api/Laundry/UpdateStatus`, {
            orderId,
            status: currentStatus,
            regectionReason: ""
          });
          setOrders(prev =>
            prev.map(order =>
              order.orderID === orderId ? { ...order, status: currentStatus } : order
            )
          );
          setMessage(t("orders.statusNow"))
          handelMessage()
          console.log(res);
          
        } catch (err) {
          console.log(err);
        }
      };

       const handelMessage =  () => {
         setTimeout(() => {
           setMessage("")
         }, 1900)
       }

       const handleAction = async (orderId) => {
          setLoadingOrderId(orderId); 
        
          try {
    
            await handleChangeStatus(orderId);
        
          } catch (error) {
            console.log(error);
          } finally {
            setLoadingOrderId(null); 
          }
      };


  return (
    <div className="coustom_container">
        <p className={`${message ? " visible opacity-100 translate-y-0" : " invisible opacity-0 -translate-y-5"} 
        duration-200  fixed top-28 left-1/2 -translate-x-1/2 bg-blue-400 text-white font-bold p-4 rounded-xl`}>
          {message ? message : ""}
        </p>
      <div className="py-16">
            <h3 className="text-center text-4xl mb-6 pb-6 font-semibold" >  الطلبات الخاصة بك  Your <span className="text-blue-500">Order</span> </h3>
        <section className="overflow-x-auto m-auto w-full" dir={currentLang === "ar" ? "rtl" : "ltr"}>
          <table className="min-w-[1000px] border-spacing-0 w-full border-[2px] border-[#EEE]">
            <thead>
              <tr>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">{t("ordersTable.orderNumber")}</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">{t("ordersTable.customerName")}</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">{t("ordersTable.orderDate")}</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">{t("ordersTable.deliveryDate")}</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">{t("ordersTable.status")}</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">{t("ordersTable.total")}</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">{t("ordersTable.rejectionReason")}</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">{t("dashboard.operation")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderID} className="text-center">
                  <td className="p-4 border">{order.orderID}</td>
                  <td className="p-4 border">{order.name}</td>
                  <td className="p-4 border">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="p-4 border">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                  <td className="p-4 border">{order.status}</td>
                  <td className="p-4 border">{order.totalAmount} ج.م</td>
                  <td className="p-4 border">{order.refusedReason === "" ? "Pending" : order.refusedReason}</td>
                  <td><button
                   onClick={() => {
                     if (order.status === "Cancel") {
                       setMessage(currentLang === "ar" ? "تم إلغاء هذا الطلب بالفعل" : "This order is already cancelled");
                       handelMessage();
                       return;
                     }
                     handleAction(order.orderID);
                   }}

                    disabled={loadingOrderId === order.orderID}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-400 transition">{loadingOrderId !== order.orderID ? (t("orders.cancelNow")) : currentLang === "ar" ? " جاري التحميل... " : "Loadding..."}</button></td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    {currentLang === "ar" ? "لا يوجد طلبات لعرضها" : "No orders to display"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
