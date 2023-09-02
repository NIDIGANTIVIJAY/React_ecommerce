import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
// import '~ag-grid-community/styles/ag-grid.css';
// import '~ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios'
import AggridBtn from "./AggridBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PreviewInvoice from "./PreviewInvoice";
import SubmitInvoice from "./processInvoice/SubmitInvoice"
import JsonData from "../../../../store/action/jsonData";
const InvoiceGeneration = () => {
  const url = process.env.REACT_APP_SERVICE_ID
  const processData = useSelector((state) => state.Common.processingArray
  )
  const dispatch = useDispatch()
  const AddedItemsData = useSelector((state) => state.Common.formatedArray)
  const nav = useNavigate()
  console.log(processData, AddedItemsData, "IIUU")
  const [coldef, setcoldef] = useState([
    {
      field: 'Item',

    },

    // { field: 'Description' },
    { field: 'Size' },
    { field: 'Product' },
    // { field: 'ProductId' },
    { field: 'Price', editable: true },
    { field: 'Quantity', editable: true },
    { field: 'Weight', editable: true },
    {
      field: 'Action', cellRenderer: (params) => (
        <AggridBtn
          data={rowData}
          params={params}
          setRowData={setRowData}

        />
      ),
    }
  ]);
  const [showSubmitbtn, setShowSubmitBtn] = useState(false)

  // const handlechangeFun=(params)=>{
  //   const column = params.column;

  //  console.log(params,  params.node.setSelected() ,"AS")

  // if(column.userProvidedColDef.field === "Item"){
  //   params.node.setSelected(true)
  //   dispatch(
  //     {
  //       type:"PROCESSINGARRAY",
  //       payload:params.data.ProductId
  //     }
  //   )
  //   dispatch(
  //     {
  //       type:"EDITEDPROCESSINGARRAY",
  //       payload:params.data
  //     }
  //   )
  //   alert(`Item is Added SuccessFully${params.data.ProductId}`);



  // }else{
  //   params.node.setSelected(false)
  // }

  // }
  // const [gridOption,setGridOption]=useState({
  //   onCellClicked:handlechangeFun
  // })


  const [rowData, setRowData] = useState()

  useEffect(() => {

    //   axios.get(url+"jsonData").then((res)=>{
    //      console.log(res)

    //        res.data.map((i)=>{
    //           let obj={}
    //            obj['Item']=i.item
    //            obj['Description']=i.description
    //            obj['Price']=i.price
    //            obj['Product']=i.product
    //            obj['ProductId']=i.productId
    //            obj['Quantity']=i.quantity
    //            obj['Size']=i.size
    //            obj['Weight']=i.weight
    //            obj["ProductUniqId"]=i.ProductUniqId

    //            arr.push(obj)

    //        })


    //  console.log(arr)

    //  setRowData(arr)

    //   })

    dispatch(JsonData(onSuccess));
  }, [])
  const onSuccess = (res) => {
    console.log(res)
    let arr = []
    res.map((i) => {

      if (i.quantity !== 0) {
        let obj = {}
        obj['Item'] = i.item
        obj['Description'] = i.description
        obj['Price'] = i.price
        obj['Product'] = i.product
        obj['ProductId'] = i.productId
        obj['Quantity'] = i.quantity
        obj['Size'] = i.size
        obj['Weight'] = i.weight
        obj["ProductUniqId"] = i.ProductUniqId
        obj["shouldShowButton"] = true
        arr.push(obj)
      }


    })

    setRowData(arr)
  }




  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [InvoiceData, setInvoiceData] = useState()

  return (<>
    <h1>Invoice Generation</h1>

    <div className="ag-theme-alpine agTable" >

      <AgGridReact columnDefs={coldef} rowData={rowData}
        rowSelection={'multiple'}
        rowMultiSelectWithClick={true}
      // gridOptions={gridOption}
      />
    </div>
    {AddedItemsData && AddedItemsData.length > 0 &&
      <div className="Button">
        <button className="AdBtn"  type="submit" onClick={() => { setShow(true) }} >Preview Invoice</button>

        {showSubmitbtn &&
          <button className="AdBtn"  type="submit" onClick={() => { setShow1(true) }} >submit</button>}
      </div>}

    {show && <PreviewInvoice show={show} setShow={setShow} InvoiceData={InvoiceData} setInvoiceData={setInvoiceData}
      setShowSubmitBtn={setShowSubmitBtn} />}
    {show1 && <SubmitInvoice show={show1} setShow={setShow1} setPreview={setShow} setInvoiceData={setInvoiceData} />}

  </>)
}

export default InvoiceGeneration