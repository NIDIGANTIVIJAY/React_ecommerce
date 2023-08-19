import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';



import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';



import { Modal, Button } from "react-bootstrap";
import "../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AmountModal = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const dispatch = useDispatch()
  const  showModal= useSelector((state) => state.Common.showModalComp)
  const ModalData = useSelector((state) => state.Common.AmountData)
  const [showData, setData] = useState()
  console.log(ModalData)


  // useEffect(() => {
  //   axios.post(url + "getinvoiceData", ModalData.productIdArr).then((res) => {
  //     console.log(res.data)
  //     setData(res.data)
  //   })
  // }, [])
  const onCloseFun = () => {

    dispatch({
        type:"SHOWMODALCOMP",
        payload:false
      })
  }

  const onclickSubmitFun=()=>{
       
    let payloadData={
        "Status":"",
        "GSTNumber":"",
        "Name":"",
        "productIdArr":"",
        "InvoiceProduct":"",
           "AmountPaid":"",
           "TotalAmount":"",
           "TotalQuatity":""
      }
      payloadData["AmountPaid"]=AmountPaid
      payloadData["GSTNumber"]=ModalData["GSTNumber"]
      payloadData["Name"]=ModalData["Name"]
      payloadData["Status"]=ModalData["Status"]
      payloadData["productIdArr"]=ModalData["productIdArr"]
      payloadData["InvoiceProduct"]=ModalData["InvoiceProduct"]
       
       
    console.log(payloadData)
    axios.post(url+"savequoteData",payloadData).then((res)=>{
        console.log(res)
       
    })
    dispatch({
        type:"SHOWMODALCOMP",
        payload:false
      })
  }

  const [AmountPaid,setAmountPaid]=useState()

  return (<>


    <Modal
      show={showModal}
      onHide={onCloseFun}
      aria-labelledby="ModalHeader"
      centered
      size="xl"
    >
      <Modal.Header closeButton onClick={onCloseFun}>

      </Modal.Header>
      <Modal.Body>

          <input type="text" onChange={(e)=>{setAmountPaid(e.target.value)}} />
          


      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={()=>{onclickSubmitFun()}} >submit </Button>
      </Modal.Footer>

    </Modal>



  </>)
}

export default AmountModal;