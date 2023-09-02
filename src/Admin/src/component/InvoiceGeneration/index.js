import React, { useEffect, useState } from "react"
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
// import '~ag-grid-community/styles/ag-grid.css';
// import '~ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios'
import AggridBtn from "./AggridBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PreviewInvoice from "./PreviewInvoice";
import SubmitInvoice from "./processInvoice/SubmitInvoice"
const InvoiceGeneration=()=>{
  const url=process.env.REACT_APP_SERVICE_ID
  const processData=useSelector((state)=>state.Common.processingArray
    )

    const nav=useNavigate()
  console.log(processData,"IIUU")
    const [coldef,setcoldef]= useState([
      { field: 'Item' },
      { field: 'Description' },
      { field: 'Price'  ,editable: true },
      { field: 'Product' },
      { field: 'ProductId' },
      { field: 'Quantity', editable: true },
      { field: 'Size', editable: true },
      { field: 'Weight' },
      {field: 'Action' ,cellRenderer: AggridBtn }
  ]);
    
    const [rowData,setRowData]=useState()

   useEffect(()=>{
    let arr=[]
    axios.get(url+"jsonData").then((res)=>{
       console.log(res)

         res.data.map((i)=>{
            let obj={}
             obj['Item']=i.item
             obj['Description']=i.description
             obj['Price']=i.price
             obj['Product']=i.product
             obj['ProductId']=i.productId
             obj['Quantity']=i.quantity
             obj['Size']=i.size
             obj['Weight']=i.weight
             arr.push(obj)

         })


   console.log(arr)
   setRowData(arr)

    })
   },[])


const [show,setShow]=useState(false)
const [show1,setShow1]=useState(false)
const [InvoiceData,setInvoiceData]=useState()

  return(<>
    <h1>Invoice Generation</h1>

    <div className="ag-theme-alpine agTable" >

    <AgGridReact columnDefs={coldef} rowData={rowData}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
    />
    </div>

     <div className="Button">
      <button type="submit" onClick={()=>{setShow(true)}} >Preview Invoice</button>
      <button type="submit" onClick={()=>{setShow1(true)}} >submit</button>
      
     </div>

     {show && <PreviewInvoice show={show} setShow={setShow} InvoiceData={InvoiceData} setInvoiceData={setInvoiceData} />}
     {  show1 && <SubmitInvoice show={show1} setShow={setShow1} setPreview={setShow} setInvoiceData={setInvoiceData}/>}
  
  </>)
}

export default InvoiceGeneration