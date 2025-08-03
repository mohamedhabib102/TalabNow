import { useState } from "react"
import axios from "axios"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";


export default function Register (){

    const [formData, setFormData] = useState({
      name: "",
      address: "",
      phoneNumber: "",
      password: "",
      role: "Client"
    })
    const [message, setMessage] = useState("")
    const [eye, setEye] = useState(false);
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()


    const currentLang = i18n.language

    const handelCahnge = (e) => {
      const {name, value} = e.target;
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
        if (!rexNumber.test(formData.phoneNumber)){
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
    className="text-center border-[2px] border-[#EEE] rounded-lg p-4 lg:w-[65%] w-full  m-auto">
      <h1 className="text-3xl font-semibold mb-8">
         {t("auth.newAccount_1")}<span className="text-blue-400"> {t("auth.newAccount_2")}</span>
      </h1>

      <div className="mb-4">
        <input
          className="border-[2px] border-[#EEE] px-4 py-3 rounded-md w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"
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
          className="border-[2px] border-[#EEE] px-4 py-3 rounded-md w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"
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
          className="border-[2px] border-[#EEE] px-4 py-3 rounded-md w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"
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

      <div className="mb-4 relative">
        <input
          className="border-[2px] border-[#EEE] px-4 py-3 rounded-md w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"
          type={eye ? "text" : "password"}
          placeholder={t("auth.password")}
          name="password"
          value={formData.password}
          onChange={handelCahnge}
          required
          maxLength={14}
        />
        <span className={`${currentLang === "ar" ? "left-4" : "right-4"}  absolute top-1/2 -translate-y-1/2 cursor-pointer`} 
        onClick={handleEye}>{eye ? <FaEye size={25}/> : <FaEyeSlash size={25}/>}</span>
      </div>

      {message ? <p className="text-left p-3 bg-[#EEE] text-red-600 font-semibold rounded-lg mb-2">{message ? message : ""}</p> : ""}

      <button className="bg-blue-500 py-3 px-4 rounded-xl text-white lg:w-40 w-full text-lg cursor-pointer mt-3">
        {t("auth.create")}
      </button>
    </form>
  </section>
</>

    )
}