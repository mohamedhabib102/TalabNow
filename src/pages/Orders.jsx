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
      const res = await axios.put(`https://laundryar7.runasp.net/api/Laundry/UpdateStatus`, {
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

  const handelMessage = () => {
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
        <h3 className="text-center text-4xl mb-6 pb-6 font-semibold text-[#1E5FAC]" >  الطلبات الخاصة بك  Your <span className="">Order</span> </h3>
        <section className="m-auto w-full" dir={currentLang === "ar" ? "rtl" : "ltr"}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order.orderID} className="relative bg-gradient-to-br from-[#0D54A0] via-[#4E88C8] to-[#ECECEC] rounded-[35px] p-4 shadow-[5px_6px_2px_rgb(0_0_0/25%)] w-[85%] mx-auto md:w-full">
                <div className="bg-[#CFE2F8] rounded-[20px] pt-6 p-2 h-full relative flex flex-col">

                  {/* Status Badge */}
                  <div className="absolute top-2 right-3 flex flex-col items-center z-10">
                    <span className="bg-white text-[#1E5FAC] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {order.status}
                    </span>
                  </div>

                  {/* Title: Customer Name */}
                  <div className="mt-6 mb-4 flex justify-center">
                    <p className="px-4 py-2 bg-white rounded-full shadow-[5px_6px_2px_rgb(0_0_0/25%)] text-[#1E5FAC] font-bold text-base text-center min-w-[120px]">
                      {order.name}
                    </p>
                  </div>

                  {/* Details Rows */}
                  <div className="space-y-2 px-1 flex-grow">

                    {/* Order Number */}
                    <div className="flex items-center justify-between">
                      <span className="bg-white text-[#1E5FAC] px-3 py-1 text-sm rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center order-last">
                        {t("ordersTable.orderNumber")}
                      </span>
                      <span className="bg-white text-[#1E5FAC] px-3 py-1 text-sm rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center">
                        {order.orderID}
                      </span>
                    </div>

                    {/* Order Date */}
                    <div className="flex items-center justify-between">
                      <span className="bg-white text-[#1E5FAC] px-3 py-1 text-sm rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center order-last">
                        {t("ordersTable.orderDate")}
                      </span>
                      <span className="bg-white text-[#1E5FAC] px-3 py-1 text-xs rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Delivery Date */}
                    <div className="flex items-center justify-between">
                      <span className="bg-white text-[#1E5FAC] px-3 py-1 text-sm rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center order-last">
                        {t("ordersTable.deliveryDate")}
                      </span>
                      <span className="bg-white text-[#1E5FAC] px-3 py-1 text-xs rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center">
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Total Amount */}
                    <div className="flex items-center justify-between">
                      <span className="bg-white text-[#1E5FAC] px-3 py-1 text-sm rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center order-last">
                        {t("ordersTable.total")}
                      </span>
                      <span className="bg-white text-[#1E5FAC] px-3 py-1 text-sm rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center">
                        {order.totalAmount} {currentLang === "ar" ? "ج.م" : "EGP"}
                      </span>
                    </div>

                    {/* Rejection Reason (if any) */}
                    {order.refusedReason && (
                      <div className="flex items-center justify-between">
                        <span className="bg-white text-red-500 px-3 py-1 text-sm rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center order-last">
                          {t("ordersTable.rejectionReason")}
                        </span>
                        <span className="bg-white text-red-500 px-3 py-1 text-xs rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] min-w-[70px] text-center">
                          {order.refusedReason}
                        </span>
                      </div>
                    )}

                  </div>

                  {/* Action Button */}
                  <div className="mt-4 mb-4 flex justify-center">
                    <button
                      onClick={() => {
                        if (order.status === "Cancel") {
                          setMessage(currentLang === "ar" ? "تم إلغاء هذا الطلب بالفعل" : "This order is already cancelled");
                          handelMessage();
                          return;
                        }
                        handleAction(order.orderID);
                      }}
                      disabled={loadingOrderId === order.orderID}
                      className={`
                          px-6 py-1.5 text-sm rounded-full font-bold shadow-[5px_6px_2px_rgb(0_0_0/25%)] transition-all duration-300
                          ${order.status === "Cancel"
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                        }
                        `}
                    >
                      {loadingOrderId === order.orderID
                        ? (currentLang === "ar" ? "جاري التحميل..." : "Loading...")
                        : t("orders.cancelNow")
                      }
                    </button>
                  </div>

                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500 text-xl">
                {currentLang === "ar" ? "لا يوجد طلبات لعرضها" : "No orders to display"}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
