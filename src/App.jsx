import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Navbar from './Components/Navbar';
import DashboardLayout from './pages/Dashboard';
import Orders from './pages/Orders';
import ProtectedRoute from './Components/ProtectedRoutes';
import OrdersProtectedRoute from './Components/OrdersProtectedRoute';
import Users from './Components/users';
import OrdersAdmin from './Components/OrdersAdmin';
import ServicesAdmin from './Components/ServicesAdmin';
import ProtectedRoutesAuth from './Components/ProtectedRoutesAuth';
import Services from './pages/Services';
import Footer from './Components/Footer';
import { FaWhatsapp } from 'react-icons/fa6';


function App() {

  return (

    <div className="min-h-screen flex flex-col dark:bg-gray-800">
      <Navbar />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/orders' element={
            <OrdersProtectedRoute>
              <Orders />
            </OrdersProtectedRoute>
          } />
          <Route element={<ProtectedRoutesAuth />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="users" replace />} />
            <Route path='users' element={<Users />} />
            <Route path='ordersAdmin' element={<OrdersAdmin />} />
            <Route path='servicesAdmin' element={<ServicesAdmin />} />
          </Route>
        </Routes>
      </main>

      <Footer />

      {/* Fixed WhatsApp Button */}
      <a
        href="https://wa.me/+201103826261"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        <FaWhatsapp size={35} />
        <span className="absolute right-full ml-3 mr-3 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          تواصل معنا واتساب
        </span>
      </a>
    </div>

  )
}

export default App
