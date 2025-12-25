import { useState } from "react"
import axios from "axios"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";


export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    password: "",
    role: "Client"
  })
  const [message, setMessage] = useState("")
  const [eye, setEye] = useState(false);
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()


  const currentLang = i18n.language

  const handelCahnge = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value
    }))
  }


  const handleEye = () => {
    setEye(!eye);
  }



  const handelSubmit = async (e) => {
    e.preventDefault()


    const rexNumber = /\d{11}/g;
    if (!rexNumber.test(formData.phoneNumber)) {
      setMessage(t("auth.messageNumber"))
      return;
    }


    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{14,}$/g;
    // if (!passwordRegex.test(formData.password)){
    //   setMessage(t("auth.messagePassword"))
    //   return;
    // }

    setMessage("");

    try {
      const response = await axios.post(
        "https://laundryar7.runasp.net/api/Laundry/AddNewClient",
        formData
      );
      setFormData({
        name: "",
        address: "",
        phoneNumber: "",
        password: ""
      })
      navigate("/login")
    } catch (error) {
      console.error("Registration Error:", error);
    }
  }
  return (
    <>
      <section className="flex justify-center items-center h-[90vh] p-4" dir={currentLang === "ar" ? "rtl" : "ltr"}>
        <form onSubmit={handelSubmit}
          className="text-center bg-white dark:bg-gray-900 border-[2px] border-[#EEE] dark:border-gray-800 rounded-2xl p-6 lg:w-[600px] w-full shadow-lg transition-colors duration-300">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
            {t("auth.newAccount_1")}<span className="text-blue-500"> {t("auth.newAccount_2")}</span>
          </h1>

          <div className="mb-4">
            <input
              className="border-[2px] border-[#EEE] dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl w-full text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 focus:border-blue-500 outline-none transition-all"
              type="text"
              placeholder={t("auth.fullName")}
              name="name"
              value={formData.name}
              onChange={handelCahnge}
              required
            />
          </div>

          <div className="mb-4">
            <input
              className="border-[2px] border-[#EEE] dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl w-full text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 focus:border-blue-500 outline-none transition-all"
              type="text"
              placeholder={t("auth.address")}
              name="address"
              value={formData.address}
              onChange={handelCahnge}
              required
            />
          </div>

          <div className="mb-4">
            <input
              className="border-[2px] border-[#EEE] dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl w-full text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 focus:border-blue-500 outline-none transition-all"
              type="text"
              id="phone"
              placeholder={t("auth.phone")}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handelCahnge}
              required
              maxLength={11}
            />
          </div>

          <div className="mb-6 relative">
            <input
              className="border-[2px] border-[#EEE] dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl w-full text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 focus:border-blue-500 outline-none transition-all"
              type={eye ? "text" : "password"}
              placeholder={t("auth.password")}
              name="password"
              value={formData.password}
              onChange={handelCahnge}
              required
              maxLength={14}
            />
            <span className={`${currentLang === "ar" ? "left-4" : "right-4"} absolute top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors`}
              onClick={handleEye}>{eye ? <FaEye size={22} /> : <FaEyeSlash size={22} />}</span>
          </div>

          {message && (
            <p className="text-left p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-xl mb-4 border border-red-100 dark:border-red-900/30">
              {message}
            </p>
          )}

          <button className="bg-blue-500 hover:bg-blue-600 active:scale-95 py-3.5 px-4 rounded-xl text-white font-bold w-full text-lg cursor-pointer mt-2 shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
            {t("auth.create")}
          </button>
        </form>
      </section>
    </>

  )
}