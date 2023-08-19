import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from "axios";
import { useSelector } from "react-redux";


const GenearatedInvoice = () => {
  const showModal = useSelector((state) => state.Common.showModal)
  const url = process.env.REACT_APP_SERVICE_ID
  const [coldef, setcolDef] = useState([
    { field: "GSTNumber" },
    { field: "Name" },

    { field: "TotalQuatity" },

    { field: "TotalAmount" },

    { field: "AmountPaid" },
    
    { field: "Status" }

  ])
  const [rowData, setRowData] = useState()

  useEffect(() => {
    axios.get(url + "GenearatedInvoice").then((res) => {
      console.log(res.data)

      setRowData(res.data)

    })
  }, [])


  return (<>
    <h1>Generated-Invoice</h1>


    <div className="ag-theme-alpine" style={{ height: 400, width: 900 }}>

      <AgGridReact columnDefs={coldef} rowData={rowData}
      />
    </div>


  </>)
}

export default GenearatedInvoice