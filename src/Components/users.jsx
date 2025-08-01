import { useTranslation } from "react-i18next";
import axios from "axios"
import { useEffect, useState } from "react";


export default function Users (){
    const {t, i18n} = useTranslation()
    const [users, setUsers] = useState([]);
    const currentLang = i18n.language;

      const getAllUsers = async () => {
        try {
            const res = await axios.get("https://laundryar7.runasp.net/api/Laundry/GetAllPerson");
            setUsers(res.data)
        } catch (error) {
            console.log(error);
        }
      }
      
      useEffect(() => {
        getAllUsers()
      }, [])
    return (
        <section>
            <div className="overflow-x-auto m-auto w-full " dir={currentLang === "ar" ? "rtl" : "ltr"}>
                <table className="min-w-[1000px] border-spacing-0 w-full border-[2px] border-[#EEE]">
                    <thead>
                        <tr>
                           <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> # </th>
                           <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("dashboard.name")}  </th>
                           <th className={`p-4 bg-[#ffff] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("dashboard.phoneNumber")} </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length < 0 ? (<p>Not Founde Users Now</p>) : (
                            users.map((ele, index) => (
                                <tr key={ele.id}>
                                    <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{index + 1}</td>
                                    <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{ele.name}</td>
                                    <td className={`p-4 text-lg text-left bg-[#f9f9f9] border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{ele.phoneNumber}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
 }