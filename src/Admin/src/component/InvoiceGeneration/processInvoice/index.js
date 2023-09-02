import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import  "./processing.css"


import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import axios from "axios";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import ProcessBtn from "./ProcessBtn";
import QuoteFormEdit from "./quoteFormEdit";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GenearatedInvoice from "../GeneratedInvoice";
import AmountModal from "./AmountModal";

const ProcessInvoice = () => {
  const nav = useNavigate();
  const showModal = useSelector((state) => state.Common.showModal);
  const showModal1 = useSelector((state) => state.Common.showModalComp1);

  const url = process.env.REACT_APP_SERVICE_ID;
  
  const [coldef, setcolDef] = useState([
    { field: "GSTNumber" },
    { field: "Name" },
    { field: "TotalQuatity" },

    { field: "TotalAmount" },

    { field: "Status" },
    { field: "Action", cellRenderer: ProcessBtn, width: 500 },
  ]);
  const [rowData, setRowData] = useState();

  useEffect(() => {
    axios.get(url + "getpendingquote").then((res) => {
      console.log(res.data);

    
      setRowData(res.data);
    });
  }, [showModal1]);

  return (
    <>
      <div className="processWrapper">
        <h1>Processing Invoice</h1>

        <div className="ag-theme-alpine agTable" >
          <AgGridReact columnDefs={coldef} rowData={rowData} />
        </div>

        <div>{showModal && <QuoteFormEdit />}</div>
        <div className="Button">
          <button
            type="submit"
            onClick={() => {
              nav("/admin/invoice/generatedinvoice");
            }}
            value={"GenearatedInvoice"}
          >
            {" "}
            GenearatedInvoice{" "}
          </button>
        </div>
        <div>{showModal1 && <AmountModal />}</div>
      </div>
    </>
  );
};

export default ProcessInvoice;
