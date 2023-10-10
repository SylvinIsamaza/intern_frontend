import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'; // Import useLocation
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Exchange from './components/exchange/Exchange'
import Home from './components/Home/Home'
import Inventory from './components/inventory/Inventory'
import Community from './components/Community/Community'
import Transaction from './components/Transaction/Transaction'
import Growth from './components/Growth/Growth'
import Employees from './components/Employees/Employees'
import Login from './components/login/login'
import Signup from './components/register/register';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoutes from './routes/ProtectedRoute';
import { store } from './redux/store';
import { loadUser } from './redux/action/user';
function App() {

  useEffect(() => {
    store.dispatch(loadUser())
   }
    , [])
  const { user,isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation(); // Get the current location

  // Check if the current path is '/login' or '/register'
  const isAuthenticationRoute = location.pathname === '/login'||location.pathname === '/register';

  return (
  
     
     

      <div className={`w-full bg-[#F0F3FE] h-screen flex overflow-hidden ${isAuthenticationRoute ? 'justify-center items-center' : ''}`}>
        

            <div className="h-screen md:block hidden">
            {!isAuthenticationRoute && (<Sidebar />)}
            </div>
      <div className="md:px-[20px] lg:px-[30px] w flex-1 overflow-auto">
      {!isAuthenticationRoute && (<Header />)}
            
              <div className="py-[80px] overflow-auto">
              <Routes>
                  <Route path='/' element={<ProtectedRoutes isAuthenticated={isAuthenticated}><Dashboard/></ProtectedRoutes>} />
                  <Route path='/exchange' Component={Exchange} />
                  <Route path='/home' Component={Home} />
                  <Route path='/inventory' Component={Inventory} />
                  <Route path='/community' Component={Community} />
                  <Route path='/transaction-overview' Component={Transaction} />
                  <Route path='/transaction-growth' Component={Growth} />
            <Route path='/employees' Component={Employees} />
            <Route path='/login' Component={Login} />
            <Route path='/register' Component={Signup}/>
                  </Routes>
              </div>
            </div>
          
        
            
        </div>
       
    
  )
}

export default App;
