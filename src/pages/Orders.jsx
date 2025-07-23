import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Components/context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const { userId } = useAuth();
  const { i18n } = useTranslation();
  const [orders, setOrders] = useState([]);

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
    
        const handleChangeStatus = async (orderId, currentStatus) => {
        const newStatus = currentStatus === "Pending" ? "Cleaned" : "Pending";
        try {
          const  res = await axios.put(`https://laundryar7.runasp.net/api/Laundry/UpdateStatus`, {
            orderId,
            status: newStatus,
            regectionReason: ""
          });

          console.log(res);
          setOrders(prev =>
            prev.map(order =>
              order.orderID === orderId ? { ...order, status: newStatus } : order
            )
          );
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className="coustom_container">
      <div className="py-16">
                    <h3 className="text-center text-4xl mb-6 pb-6 font-semibold" >  الطلبات الخاصة بك  Your <span className="text-blue-500">Order</span> </h3>
        <section className="overflow-x-auto m-auto w-full" dir={currentLang === "ar" ? "rtl" : "ltr"}>
          <table className="min-w-[1000px] border-spacing-0 w-full border-[2px] border-[#EEE]">
            <thead>
              <tr>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">رقم الطلب</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">اسم العميل</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">تاريخ الطلب</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">تاريخ التسليم</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">الحالة</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]">الإجمالي</th>
                <th className="p-4 bg-[#EEE] text-blue-400 font-bold text-[18px]"> تغير الحالة </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.orderID} className="text-center">
                  <td className="p-4 border">{index + 1}</td>
                  <td className="p-4 border">{order.name}</td>
                  <td className="p-4 border">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="p-4 border">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                  <td className="p-4 border">{order.status}</td>
                  <td className="p-4 border">{order.totalAmount} ج.م</td>
                  <td>
                    <button
                      onClick={() => handleChangeStatus(order.orderID, order.status)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      {order.status === "Pending" ? "Pending" : "Cleaned"}
                    </button>
                  </td>
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
