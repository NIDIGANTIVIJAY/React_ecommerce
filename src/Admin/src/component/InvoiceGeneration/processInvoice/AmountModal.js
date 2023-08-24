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
  // const  showModal= useSelector((state) => state.Common.showModalComp1)
  // const ModalData = useSelector((state) => state.Common.AmountData)
  // console.log(showModal,"showModalComp1")




  const onCloseFun = () => {

    // dispatch({
    //     type:"SHOWMOADALCOMPBOOL",
    //     payload:false
    //   })
  props.setShowModal1(false)


  }

  const onclickSubmitFun = () => {

    let payloadData = {
      "Status": "",
      "GSTNumber": "",
      "Name": "",
      "productIdArr": "",
      "InvoiceProduct": "",
      "AmountPaid": "",
      "TotalAmount": "",
      "TotalQuatity": "",
      "_id":"",
      "ProductUniqId":""
    }
    payloadData["AmountPaid"] = AmountPaid
    payloadData["GSTNumber"] = props.ModalData["GSTNumber"]
    payloadData["Name"] = props.ModalData["Name"]
    payloadData["Status"] = props.ModalData["Status"]
    payloadData["productIdArr"] = props.ModalData["productIdArr"]
    payloadData["InvoiceProduct"] =props.ModalData["InvoiceProduct"]
    payloadData["_id"]=props.ModalData["_id"]
  payloadData["ProductUniqId"]=props.ModalData["ProductUniqId"]
    console.log(payloadData)
    axios.post(url+"savequoteData",payloadData).then((res)=>{
        console.log(res)
       
    })
    props.setShowModal1(false)

  }

  const [AmountPaid,setAmountPaid]=useState()

  return (<>


    <Modal
      show={props.show}
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