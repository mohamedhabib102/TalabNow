import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Components/context/AuthContext";
import { useTranslation } from "react-i18next";
import { FaXmark, FaCircleInfo } from "react-icons/fa6";
import { MdLocalLaundryService } from "react-icons/md";
import { IoCalendarOutline, IoTimeOutline, IoDocumentTextOutline } from "react-icons/io5";
import { SiTrueup } from "react-icons/si";



export default function Orders() {
  const { userId } = useAuth();
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("")
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true)


  const getAllOrders = async () => {
    const id = parseFloat(userId);
    try {
      setLoading(true)
      const res = await axios.get(`https://laundryar7.runasp.net/api/Laundry/GetOrderByID/${id}`);
      setOrders(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
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


  if (loading) {
    return (
      <div className="coustom_container">
        <p className="text-center text-gray-600 mt-10">
          {currentLang === "ar" ? " جاري التحميل " : "Loading..."}
        </p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="coustom_container">
        <p className="text-center text-gray-600 mt-10">
          {currentLang === "ar" ? "لا يوجد طلبات" : "No orders"}
        </p>
      </div>
    )
  }

  return (
    <div className="coustom_container">
      <p className={`${message ? " visible opacity-100 translate-y-0" : " invisible opacity-0 -translate-y-5"} 
        duration-200  fixed top-28 left-1/2 -translate-x-1/2 bg-blue-400 text-white font-bold p-4 rounded-xl z-[100]`}>
        {message ? message : ""}
      </p>

      {/* Detail Modal */}
      <div dir={currentLang === "ar" ? "rtl" : "ltr"} className={`${showDetail ? "visible" : "invisible"} transition bg-[#00000096] fixed w-full h-full top-0 left-0 z-[60] backdrop-blur-sm`}></div>
      <div className={`
           ${showDetail ? " scale-100" : " scale-0"}
             transition fixed z-[70] bg-[#EEE] dark:bg-gray-900 py-9 px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[45%] w-[92%] rounded-[40px] shadow-2xl border-2 border-white/50 dark:border-gray-700 overflow-y-auto max-h-[90vh]`}>
        <FaXmark onClick={() => setShowDetail(false)} className=" absolute top-5 right-5 cursor-pointer transition text-gray-600 dark:text-gray-400 hover:text-blue-500" size={25} />

        {selectedOrder && (
          <div className="text-center pt-4">
            <div className="w-20 h-20 bg-[#1E5FAC]/20 dark:bg-blue-900/40 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-sm border border-white/50 dark:border-gray-700">
              <MdLocalLaundryService size={50} className="text-[#0D54A0] dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E5FAC] dark:text-blue-400 mb-2">{t("ordersTable.orderNumber")} #{selectedOrder.orderID}</h3>
            <div className="inline-block px-4 py-1.5 bg-white dark:bg-gray-800 rounded-full text-[#1E5FAC] dark:text-blue-400 font-bold text-sm shadow-sm border border-[#CFE2F8] dark:border-gray-700 mb-6">
              {selectedOrder.status}
            </div>

            <div className="space-y-4 px-2 mb-8 text-right">
              <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border-l-4 border-blue-400">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-bold">
                  <IoCalendarOutline size={20} className="text-[#0D54A0] dark:text-blue-400" />
                  <span>{t("ordersTable.orderDate")}</span>
                </div>
                <span className="font-bold text-[#0D54A0] dark:text-blue-400">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border-l-4 border-green-400">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-bold">
                  <IoTimeOutline size={20} className="text-[#0D54A0] dark:text-blue-400" />
                  <span>{t("ordersTable.deliveryDate")}</span>
                </div>
                <span className="font-bold text-[#0D54A0] dark:text-blue-400">{new Date(selectedOrder.deliveryDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border-l-4 border-yellow-400">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-bold">
                  <IoDocumentTextOutline size={20} className="text-[#0D54A0] dark:text-blue-400" />
                  <span>{t("ordersTable.total")}</span>
                </div>
                <span className="font-bold text-xl text-[#0D54A0] dark:text-blue-400">{selectedOrder.totalAmount} {currentLang === "ar" ? "ج.م" : "EGP"}</span>
              </div>

              {selectedOrder.refusedReason && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-900/30 text-right">
                  <p className="text-red-500 dark:text-red-400 font-bold text-sm mb-1">{t("ordersTable.rejectionReason")}:</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedOrder.refusedReason}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  handleAction(selectedOrder.orderID);
                  setShowDetail(false);
                }}
                disabled={loadingOrderId === selectedOrder.orderID || selectedOrder.status === "Cancel"}
                className={`
                    w-full py-4 text-lg rounded-2xl font-bold shadow-lg transition-all duration-300
                    ${selectedOrder.status === "Cancel"
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-red-500 hover:bg-red-600 text-white"
                  }
                `}
              >
                {loadingOrderId === selectedOrder.orderID
                  ? (currentLang === "ar" ? "جاري الإلغاء..." : "Cancelling...")
                  : (selectedOrder.status === "Cancel" ? (currentLang === "ar" ? "تم الإلغاء" : "Cancelled") : t("orders.cancelNow"))
                }
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="md:py-16 py-8">
        <h3 className="text-center text-4xl mb-12 font-bold text-[#1E5FAC]">
          Your Orders طلباتك
        </h3>

        <section className="max-w-4xl mx-auto px-4" dir={currentLang === "ar" ? "rtl" : "ltr"}>
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order.orderID} className="group relative">
                {/* Horizontal Card Design as per sketch */}
                <div className="bg-[#0D54A0]/20 dark:bg-gray-900/20 rounded-[30px] p-1 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-white/50">
                  <div className="bg-white/20 dark:bg-gray-900/20 rounded-[28px] p-3.5 md:p-4 flex md:flex-row flex-col-reverse items-center justify-between gap-1.5">

                    {/* ID & Details Button (Left Side) */}
                    <div className="flex md:flex-col flex-row-reverse items-center justify-between h-24 min-w-[100px]">
                      <span className="bg-[#0D54A0]/20 text-[#0D54A0] px-3 py-1 rounded-xl text-sm font-black w-fit border border-[#0D54A0]/10">
                        #{order.orderID}
                      </span>

                      <button
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowDetail(true)
                        }}
                        className="bg-[#0D54A0] text-white p-2.5 rounded-xl shadow-lg hover:bg-blue-700 transition-colors w-10 h-10 flex items-center justify-center group-hover:animate-pulse"
                      >
                        <FaCircleInfo size={20} />
                      </button>
                    </div>

                    {/* Middle Content (Name & Price) */}
                    <div className="flex-grow text-center">
                      <h4 className="text-[#1E5FAC] font-black text-xl md:text-2xl mb-2">
                        {order.name}
                      </h4>
                      <div className="flex items-center justify-center gap-2">
                        <span className="h-0.5 w-8 bg-[#0D54A0]/20 rounded-full"></span>
                        <p className="text-[#0D54A0] font-black text-lg">
                          {order.totalAmount} {currentLang === "ar" ? "ج.م" : "EGP"}
                        </p>
                        <span className="h-0.5 w-8 bg-[#0D54A0]/20 rounded-full"></span>
                      </div>
                    </div>

                    {/* Icon (Right Side) */}
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-white/60 dark:bg-gray-900/60 rounded-3xl flex items-center justify-center shadow-inner border border-white/40 overflow-hidden relative">
                      <MdLocalLaundryService size="80%" className="text-[#0D54A0] opacity-30 absolute -right-2 -bottom-2" />
                      <MdLocalLaundryService size="60%" className="text-[#0D54A0]" />

                      {/* Small Status Indicator */}
                      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full shadow-sm ${order.status === "Cancel" ? "bg-red-400" : "bg-green-400 animate-pulse"}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-xl font-bold">
                  {currentLang === "ar" ? "لا يوجد طلبات حالياً" : "No orders yet"}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
