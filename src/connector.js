import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Admin from "./Admin/src/App"

const Connector=()=>{
    return<>
 
 
 <Routes>
 <Route  exact path="/*" element={<App />} />
 <Route exact path="/Admin/*" element={<Admin/>}/>
 </Routes>


    </>
}
export default Connector