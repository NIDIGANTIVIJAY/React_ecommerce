import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from "./App";
import Admin from "./Admin/src/App"
import AdminLoginPage from "./AdminLoginPage"
import { Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import AuthWrapper from "./Authwraper";
const Connector=()=>{
  
   
     
    return<>
 
 
 <Routes>


 <Route  exact path="/*" element={<App />} />

 <Route path="/Admin/Login" element={<AdminLoginPage />} />
   
 <Route exact path="/Admin/*" element={<AuthWrapper> <Admin/> </AuthWrapper>}/>:
 
  
    
 
   
 </Routes>


    </>
}
export default Connector