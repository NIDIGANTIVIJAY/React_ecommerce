import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import amwLogo from "../../../components/Assets/AMW-Logo.png"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const Component = () => {
  const nav = useNavigate();
  const token=useSelector((state)=>state.Login.token)
  console.log(token,"OPITOKEN")
  const AdminDashboardChange = () => {
    nav("/admin/Dashboard");
  };
  const InvoicesideBarChange = () => {
    nav("/admin/invoice");
  };
  const ProductionsideBarChange = () => {
    nav("/admin/production");
  };
  const AccountsideBarChange = () => {
    nav("/admin/accounts");
  };
  const ExpensessideBarChange = () => {
    nav("/admin/expenses");
  };

  const landingPage = ()=>{
    nav("/admin/Dashboard");
  }
  const dispatch=useDispatch()
  
  const url =process.env.REACT_APP_SERVICE_ID

  const [toggelerState, setToggelerState] = useState(true);
  const [activeBar, setActiveBar] = useState("sideBarBtnActive");

  // if(nav("/admin/Dashboard")=== true){

  // }

  const toggelerFun = () => {
    setToggelerState(!toggelerState);
  };
  const logoutFun = (e) => {
    axios
      .post(url + "user/logoutAll", { Authorization: `Bearer ${token}` })
      .then((res) => {
        console.log(res);
        dispatch({
          type:"TOKEN",
          payload:false
         })
         
         dispatch({
          type:"LOGIN",
          payload:false
         })
        nav("/admin");
      });
  };

  return (
    <>
      <div className="main">
        <div className="header">
          <div className="logoContainer" >
            <img  className={"logoImg"} src={amwLogo} alt="amwLogo" onClick={() => landingPage()} />
            <p>Aakash Metal Works (AMW)</p>
          </div>

          <div className={"toggelerContainer"} onClick={() => toggelerFun()}>
            <span className={"spanline"}></span>
            <span className={"spanline"}></span>
            <span className={"spanline"}></span>
          </div>

          <div> 
            <button type="submit" onClick={()=>{logoutFun()}}>Logout</button>

          </div>
        </div>

        <div className="navbar">
          <nav
            className={toggelerState ? "list" : "list2"}
            onClick={() => toggelerFun()}
          >
            <div className="side-nav--diere">

            <span
                className="sideBarBtn"
                onClick={() => {
                  AdminDashboardChange();
                }}
              >
               Dashboard
              </span>
              <span
                className="sideBarBtn"
                onClick={() => {
                  InvoicesideBarChange();
                }}
              >
                InVoice Geneartion
              </span>
              <span
                className="sideBarBtn"
                onClick={() => {
                  ProductionsideBarChange();
                }}
              >
                Production
              </span>
              <span
                className="sideBarBtn"
                onClick={() => {
                  AccountsideBarChange();
                }}
              >
                Account Section
              </span>
              {/* <span
                className="sideBarBtn"
                onClick={() => {
                  ExpensessideBarChange();
                }}
              >
                Expenses
              </span> */}
            </div>
          </nav>

          <div className="content-view">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
