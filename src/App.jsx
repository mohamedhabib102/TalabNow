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


function App() {

  return (

    <>
    <main className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/orders' element={
            <OrdersProtectedRoute>
              <Orders />
            </OrdersProtectedRoute>
        }/>
        <Route element={<ProtectedRoutesAuth />}>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Route>

          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="users" replace />} />
             <Route path='users' element={<Users />}/>
             <Route path='ordersAdmin' element={<OrdersAdmin />}/>
             <Route path='servicesAdmin' element={<ServicesAdmin />}/>
          </Route>
      </Routes>
    </main>
    </>

  )
}

export default App
