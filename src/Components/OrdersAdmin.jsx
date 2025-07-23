import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersAdmin() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const res = await axios.get("https://laundryar7.runasp.net/api/Laundry/GetAllOrder");
      setOrders(res.data); // ✅ احفظ البيانات في state
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <section>
      <div className="overflow-x-auto m-auto w-full" dir={currentLang === "ar" ? "rtl" : "ltr"}>
        {orders.length === 0 ? (
          <p className="text-center py-10 text-lg text-gray-500">{t("dashboard.notFoundOrders") || "Not Found Orders"}</p>
        ) : (
          <table className="min-w-[1000px] border-spacing-0 w-full border-[2px] border-[#EEE]">
            <thead>
              <tr>
                <th className="p-4 bg-white text-blue-400 font-bold text-[18px]">#</th>
                <th className="p-4 bg-white text-blue-400 font-bold text-[18px]">{t("dashboard.name")}</th>
                <th className="p-4 bg-white text-blue-400 font-bold text-[18px]">{t("dashboard.phoneNumber")}</th>
                <th className="p-4 bg-white text-blue-400 font-bold text-[18px]">{t("dashboard.address") || "Address"}</th>
                <th className="p-4 bg-white text-blue-400 font-bold text-[18px]">{t("dashboard.status") || "Status"}</th>
                <th className="p-4 bg-white text-blue-400 font-bold text-[18px]">{t("dashboard.orderDate") || "Order Date"}</th>
                <th className="p-4 bg-white text-blue-400 font-bold text-[18px]">{t("dashboard.services") || "Services"}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.orderID} className="text-center border-t">
                  <td className="p-4 text-lg">{index + 1}</td>
                  <td className="p-4 text-lg">{order.personName}</td>
                  <td className="p-4 text-lg">{order.phoneNumberPlus}</td>
                  <td className="p-4 text-lg">{order.addressPlus}</td>
                  <td className="p-4 text-lg">{order.orderStatus}</td>
                  <td className="p-4 text-lg">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="p-4 text-lg">
                    <ul className="text-lg">
                      {order.services.map((service, i) => (
                        <li key={i}>
                          {service.serviceName} × {service.quantity} = {service.subTotal} ج.م
                        </li>
                      ))}
                    </ul>
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
