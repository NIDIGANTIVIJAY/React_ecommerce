import React, { useEffect, useState } from "react"
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';



import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';



import { Modal, Button } from "react-bootstrap";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const PreviewInvoice=(props)=>{
  const url=process.env.REACT_APP_SERVICE_ID
  const nav=useNavigate()
  const dispatch=useDispatch()
  const processDataArra=useSelector((state)=>state.Common.processingArray
    )
    console.log(processDataArra,"PPPPP")
    const formatedArray=useSelector((state)=>state.Common.formatedArray)
    console.log(formatedArray,"UUUUUU")
  const [src,setsrc]=useState('')
    useEffect(()=>{
      let payloadData={
        "productIdArr":"",
        "Status":"",
        "InvoiceProduct":""
      }
      console.log(props.InvoiceData)
        if(props.InvoiceData?.Status === "pending" && props.InvoiceData?.Status !== undefined  ){
          payloadData=props.InvoiceData
     
        }else{
          payloadData["productIdArr"]=processDataArra
          payloadData["Status"]="initiate"
          payloadData["InvoiceProduct"]=formatedArray
        }
        console.log(payloadData,"PAYLOAD")

        axios.post(url+"getquote",payloadData).then((res)=>{
            console.log(res)
            setsrc(res.data)
        })
     
            
        
    },[])

    const onCloseFun=()=>{
      
      if(props.InvoiceData?.Status === "pending" && props.InvoiceData?.Status !== undefined  ){
        props.setInvoiceData()
        // dispatch(
        //   {
        //     type:"PROCESSINGARRAY",
        //     payload:false
            
        //   }
        // )
        // dispatch(
        //   {
        //     type:"EDITEDPROCESSINGARRAY",
        //     payload:false
            
        //   }
        // )
        dispatch(
          {
            type:"RESETEDITEDPROCESSINGARRAY",
       
            
          }
        )
        dispatch(
          {
            type:"RESETPROCESSINGARRAY",
           
            
          }
        )
          nav("process")
          console.log("IN CLOSEFUN1")
       
        
      }
  props.setShow(false)
    }

  return(<>
   

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
        {parse(src)}
        </Modal.Body>
       
      </Modal>

  
  
  </>)
}

export default PreviewInvoice;
