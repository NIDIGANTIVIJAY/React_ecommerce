import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from "axios";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';
import ProcessBtn from "./ProcessBtn";
import QuoteFormEdit from "./quoteFormEdit";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GenearatedInvoice from "../GeneratedInvoice";
 import AmountModal from "./AmountModal";

const ProcessInvoice = () => {
  const nav = useNavigate()
  const showModal = useSelector((state) => state.Common.showModal)
  const showModal1 = useSelector((state) => state.Common.showModalComp)

  const url = process.env.REACT_APP_SERVICE_ID
  const [coldef, setcolDef] = useState([
    { field: "GSTNumber" },
    { field: "Name" },
    { field: "TotalQuatity" },

    { field: "TotalAmount" },
    
    { field: "Status" },
    { field: "Action", cellRenderer: ProcessBtn, width: 500 }
  ])
  const [rowData, setRowData] = useState()

  useEffect(() => {
    axios.get(url + "getpendingquote").then((res) => {
      console.log(res.data)

      const flatMao = res.data.flatMap(row => row.InvoiceProduct.map(i => ({
        ...row, Item: i.Item, Description: i.Description, Price: i.Price
        , Product: i.Product, ProductId: i.ProductId, Quantity: i.Quantity, Size: i.Size, Weight: i.Weight
      })))
      console.log(flatMao)
      setRowData(res.data)

    })
  }, [showModal1])


  return (<>
    <h1>ProcessInvoice</h1>


    <div className="ag-theme-alpine" style={{ height: 400, width: 1100 }}>

      <AgGridReact columnDefs={coldef} rowData={rowData}

      />
    </div>

    <div>
      {showModal && <QuoteFormEdit />}
    </div>
    <div>
      <Button type="submit" onClick={() => { nav("/admin/invoice/generatedinvoice") }} value={"GenearatedInvoice"} > GenearatedInvoice </Button>
    </div>
    <div>
      {showModal1 && <AmountModal/> }
    </div>


  </>)
}

export default ProcessInvoice