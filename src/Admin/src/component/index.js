import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import amwLogo from "../../../components/Assets/AMW-Logo.png"

const Component = () => {
  const nav = useNavigate();
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

  const [toggelerState, setToggelerState] = useState(true);

  const toggelerFun = () => {
    setToggelerState(!toggelerState);
  };

  return (
    <>
      <div className="main">
        <div className="header">
          <div className="logoContainer">
            <img className={"logoImg"} src={amwLogo} alt="amwLogo" />
            <p>Aakash Metal Works (AMW)</p>
          </div>

          <div className={"toggelerContainer"} onClick={() => toggelerFun()}>
            <span className={"spanline"}></span>
            <span className={"spanline"}></span>
            <span className={"spanline"}></span>
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
