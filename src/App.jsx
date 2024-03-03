import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './App.css'
import authServices from './appwrite/auth.services'
import {login, logout} from './store/authSlice'
import {Header, Footer} from './components/index'
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=> console.log(error))
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
          <Header/>
          <main>
          <Outlet />
        </main>
          <Footer/>
      </div>
    </div>
  ) : (<div className="flex justify-center items-center pt-[300px]">Please wait while we are fecthing details</div>)
};

export default App;
