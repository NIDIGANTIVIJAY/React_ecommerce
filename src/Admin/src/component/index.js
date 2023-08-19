import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import  "../App.css"

const Component=()=>{
   const nav=useNavigate()
   const InvoicesideBarChange=()=>{
      nav("/admin/invoice")
   }
   const ProductionsideBarChange=()=>{
    nav("/admin/production")
 }
 const AccountsideBarChange=()=>{
    nav("/admin/accounts")
 }
 const ExpensessideBarChange=()=>{
    nav("/admin/expenses")
 }

    return<>

     <div className='main'>
      <div className='header'>
        <h1>Aakash Metal Works (AMW)</h1>
      </div>

     <div className='navbar'>
        <div className='side-nav--diere'>

          <span className='sideBarBtn' onClick={() => { InvoicesideBarChange() }}>InVoice Geneartion</span>
          <span className='sideBarBtn' onClick={() => { ProductionsideBarChange() }}>Production</span>
          <span className='sideBarBtn'onClick={() => { AccountsideBarChange() }} >Account Section</span>
          <span className='sideBarBtn'onClick={() => { ExpensessideBarChange() }} >Expenses</span>


        </div>
        <div className='content-view'>
           <Outlet/>


        </div>

        </div>
    
    
    
    </div>
    </>
}

export default Component