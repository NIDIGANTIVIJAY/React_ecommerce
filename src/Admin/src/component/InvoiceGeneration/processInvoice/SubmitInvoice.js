import React, { useEffect, useState } from "react"
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';



import axios from "axios";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';



import { Modal, Button } from "react-bootstrap";

const SubmitInvoice =(props)=>{
  const url=process.env.REACT_APP_SERVICE_ID
  const processDataArra=useSelector((state)=>state.Common.processingArray
    )
    const formatedArray=useSelector((state)=>state.Common.formatedArray)
    console.log(formatedArray)
// const [data,setData]=useState()
//     useEffect(()=>{
//       axios.post(url+"getinvoiceData",processDataArra).then((res)=>{
//         console.log(res.data)
//         setData(res.data)
//     })

//     },[])


  const [src,setsrc]=useState('')
    const [name,setName]=useState()
    const [gstNun,setGstNum]=useState()

        const onClicSubmitFun=()=>{
          let payloadData={
            "Status":"pending",
            "GSTNumber":"",
            "Name":"",
            "productIdArr":"",
            "InvoiceProduct":"",
            "AmountPaid":""
          }
          payloadData["productIdArr"]=processDataArra
          
          payloadData["Name"]=name
          
          payloadData["GSTNumber"]=gstNun
          payloadData["InvoiceProduct"]=formatedArray
        axios.post(url+"savequoteData",payloadData).then((res)=>{
            console.log(res)
           
        })
        props.setShow(false)
        props.setPreview(true)
        props.setInvoiceData(payloadData)

    }
       
     
            
        
  

    const onCloseFun=()=>{
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
            <label>Enter Name</label>
            <input type="text" onChange={(e)=>{setName(e.target.value)}}/>

            <label>Enter GST</label>
            <input type="text" onChange={(e)=>{setGstNum(e.target.value)}}/>
              <input type="submit" value={"submit"} onClick={()=>{onClicSubmitFun()}}></input>
        </Modal.Body>
       
      </Modal>

  
  
  </>)
}

export default SubmitInvoice;