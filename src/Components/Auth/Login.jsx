import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [messageKey, setMessageKey] = useState("");
  const [messageErrorKey, setMessageErrorKey] = useState("");
  const [eye, setEye] = useState(false);
  const { setUserType, setUserId } = useAuth();
  const navigate = useNavigate();

  const handelCahnge = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const rexNumber = /\d{11}/g;
    if (!rexNumber.test(formData.phoneNumber)) {
      setMessageKey("auth.messageNumber");
      return;
    }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{14,}$/g;
    // if (!passwordRegex.test(formData.password)) {
    //   setMessageKey("auth.messagePassword");
    //   return;
    // }

    setMessageKey("");
    setMessageErrorKey("");

    try {
      const response = await axios.post(
        "https://laundryar7.runasp.net/api/Laundry/login",
        formData
      );
      const data = response.data;
      const role = data.role;
      setUserType(data.role);
      setUserId(data.id);
      setFormData({ phoneNumber: "", password: "" });

      if (role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.response?.status === 401) {
        setMessageErrorKey("auth.mesaageErroLog");
      }
    }
  };

  const handleEye = () => {
    setEye(!eye);
  };

  return (
    <section
      className="flex justify-center items-center h-[90vh] p-4"
      dir={currentLang === "ar" ? "rtl" : "ltr"}
    >
      <form
        onSubmit={handelSubmit}
        className="text-center border-[2px] border-[#EEE] rounded-lg p-4 lg:w-[65%] w-full  m-auto"
      >
        <h1 className="text-3xl font-semibold mb-8">
          {t("auth.loginAccount_1")}{" "}
          <span className="text-blue-400">{t("auth.loginAccount_2")}</span>
        </h1>

        <div className="mb-4 last:mb-0">
          <input
            className="border-[2px] border-[#EEE] px-4 py-3 rounded-md w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"
            type="text"
            id="userPhone"
            placeholder={t("auth.phone")}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handelCahnge}
            required
            maxLength={11}
          />
        </div>

        <div className="mb-4 last:mb-0 relative">
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
          <span
            className={`${
              currentLang === "ar" ? "left-4" : "right-4"
            } absolute top-1/2 -translate-y-1/2 cursor-pointer`}
            onClick={handleEye}
          >
            {eye ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
          </span>
        </div>

        {messageKey && (
          <p className="text-left p-3 bg-[#EEE] text-red-600 font-semibold rounded-lg mb-2">
            {t(messageKey)}
          </p>
        )}
        {messageErrorKey && (
          <p
            dir={currentLang === "ar" ? "rtl" : "ltr"}
            className={`${
              currentLang === "ar" ? "text-right" : "text-left"
            } p-3 bg-[#EEE] text-red-600 font-semibold rounded-lg mb-2`}
          >
            {t(messageErrorKey)}
          </p>
        )}

        <button className="bg-blue-500 py-3 px-4 rounded-xl text-white lg:w-40 w-full text-lg cursor-pointer mt-3">
          {t("auth.login")}
        </button>
      </form>
    </section>
  );
}
