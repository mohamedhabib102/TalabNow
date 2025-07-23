import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import axios from "axios"
import { useAuth } from "../Components/context/AuthContext";




export default function Services (){
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState("")
    const { t, i18n } = useTranslation();
    const {userId} = useAuth()
    const [message, setMessage] = useState("")


    
    useEffect(() => {
      getAllServces()
    }, [])


    const getAllServces = async () => {
      try {
        const res = await axios.get("https://laundryar7.runasp.net/api/Laundry/GetAllServices");
        const data = res.data.map((item) => ({
          ...item, quantity: 1,
        }));
        console.log(data);
        setServices(data)
      } catch (error) {
        console.log(error);
      }
    }
    const currentLang = i18n.language;
    const toggleChange = () => {
        setToggle(!toggle)
    }

     // with price 

     const handleQuantityChange = (id, type) => {
       const updatedServices = services.map((item) => {
         if (item.servicesID === id) {
           const newQuantity = type === "inc"
             ? item.quantity + 1
             : item.quantity > 1
             ? item.quantity - 1
             : 1;

             const newTotalPrice = item.unitPrice * newQuantity;
     
           return {
             ...item,
             quantity: newQuantity,
             totalPrice: newTotalPrice,
           };
         }
         return item;
       });
     
       setServices(updatedServices);
     };

    const handelAllTotal = () => {
      const total = services
        .filter((service) => selectedServices === service.servicesID)
        .reduce((acc, curr) => {
          return acc + (curr.unitPrice * curr.quantity);
        }, 0);
      return total;
    };




      const handleSubmit = async (e) => {
        e.preventDefault()
        const selected = services.filter(serv => selectedServices === serv.servicesID);
        console.log(selected);
        let payload;
        const result = selected.map((ele) => {
         payload = {
          personId: parseFloat(userId),
          phoneNumberPlus: phone,
          addressPlus: address,
          totalAmount: handelAllTotal(),
          services: [
            {
            servicesID: ele.servicesID,
            quantity: ele.quantity,
            unitPrice: ele.unitPrice
            }
          ]
        }
      })

      // console.log(payload);
      
         try {
           const res = await axios.post("https://laundryar7.runasp.net/api/Laundry/CreateOrder", payload);
           setPhone("")
           setAddress("")
           setToggle(!toggle);
           setMessage("✅ Service added successfully!")
           console.log(res)
         } catch (error) {
           console.log(error);
        }
    }



     const handelMessage =  () => {
         setTimeout(() => {
          setMessage("")
         }, 1900)
     }
    return (
        <>
        <div  dir={currentLang === "ar" ? "rtl" : "ltr"} className={`${toggle ? "visible" : "invisible"} transition bg-[#00000096] fixed w-full h-full top-0 left-0 z-10`}></div>
        <p className={`${message ? " visible opacity-100 translate-y-0" : " invisible opacity-0 -translate-y-5"} 
        duration-200  fixed top-28 left-1/2 -translate-x-1/2 bg-blue-400 text-white font-bold p-4 rounded-xl`}>{message ? message : ""}</p>
        <div className={`
           ${toggle ? " scale-100" : " scale-0"}
             transition fixed z-50  bg-[#EEE] py-9 px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[55%] w-[95%] rounded-xl`}>
           <FaXmark  onClick={toggleChange} className=" absolute top-5 right-5 cursor-pointer transition hover:text-blue-500" size={25}/>
            <h3 className="text-center text-3xl mb-5 pb-4 font-semibold">   إنشاء طلب ج<span className="text-blue-400">ديد</span> </h3>
            <form 
            onSubmit={handleSubmit}
            className="text-center">
               <div className="mb-4 last:mb-0">
                    <input
                    className="px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"  
                    type="text" 
                    id="userPh
                    one" placeholder=" رقم الهاتف " 
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4 last:mb-0">
                    <input
                    className="px-4 py-3 rounded-xl w-full placeholder:text-lg placeholder:duration-200 focus:placeholder:opacity-0 outline-none"  
                    type="text" 
                    id="add" 
                    placeholder=" العنوان " 
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button onClick={handelMessage} type="submit" className="bg-blue-500 py-3 px-4 rounded-xl text-white lg:w-28 w-full text-lg cursor-pointer mt-3">  ارسال </button>
            </form>
        </div>
        <div className="coustom_container">
        <div className="py-16 px-3">
            <h3 className="text-center text-4xl mb-6 pb-6 font-semibold" >  الخدمات  Servic<span className="text-blue-500">es</span> </h3>
        <section className="overflow-x-auto m-auto w-full " dir={currentLang === "ar" ? "rtl" : "ltr"}>
            <table className="min-w-[1000px] border-spacing-0 w-full border-[2px] border-[#EEE]">
                <thead>
                    <tr>
                       <th className={`p-4 bg-[#EEE] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.number")} </th>
                       <th className={`p-4 bg-[#EEE] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.serviceName")}  </th>
                       <th className={`p-4 bg-[#EEE] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.price")} </th>
                       <th className={`p-4 bg-[#EEE] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.select")} </th>
                       <th className={`p-4 bg-[#EEE] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.quantity")} </th>
                       <th className={`p-4 bg-[#EEE] text-blue-400 font-bold text-[20px] ${currentLang === "ar" ? "border-l-white border-l-2 last:border-l-0" : "border-r-white border-r-2 last:border-r-0"}`}> {t("orders.total")} </th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((ele, index) => (
                      <tr key={ele.servicesID}>
                            <td className={`p-4 text-lg text-center bg-white border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{index + 1}</td>
                            {/* <td className={`p-4 text-lg text-center bg-white border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{ele.partName}</td> */}
                            <td className={`p-4 text-lg text-center bg-white border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{ele.servicesName}</td>
                            <td className={`p-4 text-lg text-center bg-white border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{ele.unitPrice} ج.م</td>
                            <td className={`p-4 text-lg text-center bg-white border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>
                                <input 
                                name="checked"  
                                className="cursor-pointer h-6 w-5"  
                                type="checkbox" 
                                 onChange={() => {
                                  if (selectedServices === ele.servicesID) {
                                    setSelectedServices(null);
                                  } else {
                                    setSelectedServices(ele.servicesID);
                                  }
                                }}
                                checked={selectedServices === ele.servicesID}
                                />
                            </td>
                            <td className={`p-4 text-lg text-center bg-white border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>  
                                <button  onClick={() => {
                                  handleQuantityChange(ele.servicesID, "dec")
                                  handelAllTotal()
                                }} className="bg-blue-400 py-2 px-3 rounded-lg text-white cursor-pointer hover:bg-blue-500 transition"><FaMinus /></button>  
                                  <span className="inline-block px-2">{ele.quantity} </span> 
                                <button  onClick={() => {
                                  handleQuantityChange(ele.servicesID, "inc")
                                  handelAllTotal()
                                }} className="bg-blue-400 py-2 px-3 rounded-lg text-white cursor-pointer hover:bg-blue-500 transition"><FaPlus /></button> 
                            </td>
                            <td className={`p-4 text-lg text-center bg-white border-b-[2px] border-b-[#eee] ${currentLang === "ar" ? "border-l-[#eeee] border-l-2" : "border-r-[#eee] border-r-2"}`}>{ele.totalPrice || ele.unitPrice} ج.م</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
        <div className="mt-6 pt-4 flex lg:flex-row flex-col lg:gap-0 gap-3 justify-between items-center">
        <p className="lg:text-right lg:w-36 w-full text-center bg-blue-500 cursor-pointer transition hover:bg-blue-400 text-white font-semibold p-3 rounded-lg">{t("orders.allTotal")}: <span>{handelAllTotal()} ج.م</span></p>
        {userId ? (
              <button
        className={`block   ${selectedServices ? "visible" : "invisible"} lg:text-right lg:w-36 w-full text-center bg-blue-500 transition text-white py-3 px-5 rounded-xl cursor-pointer text-lg hover:bg-blue-400`}
        onClick={() => {
            toggleChange()
        }}
        > {t("orders.create")}</button>
        ) : ""}
        </div>
        </div>
        </div>
        </>
    )
}