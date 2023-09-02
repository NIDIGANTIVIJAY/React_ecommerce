import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from "axios";
import { useSelector } from "react-redux";
import DownloadCellRenderer from './AgGridDownload';

const GenearatedInvoice = () => {
  const showModal = useSelector((state) => state.Common.showModal)
  const url = process.env.REACT_APP_SERVICE_ID
  const [coldef, setcolDef] = useState([
    { field: "GSTNumber" },
    { field: "Name" },

    { field: "TotalQuatity" },

    { field: "TotalAmount" },

    { field: "AmountPaid" },
    { field: "DueAmount" },
    { field: "Status" },
    {headerName:"Action",
  
    cellRenderer:(param)=>< DownloadCellRenderer param={param}/>,}
   

  ])
  const [rowData, setRowData] = useState()

  useEffect(() => {
    axios.get(url + "GenearatedInvoice").then((res) => {
      console.log(res.data)

      setRowData(res.data)

    })
  }, [])


  return (<>
    <div className="headerDiv">
      <h1>Generated Invoice</h1>
    </div>
    


    <div className="ag-theme-alpine agTable" >

      <AgGridReact columnDefs={coldef} rowData={rowData}
      />
    </div>

    <div className="Button">
      {/* <button type="submit"  >Back</button> */}
     </div>


  </>)
}

export default GenearatedInvoice