import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

import Select from 'react-select';


import axios from "axios";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';



import { Modal, Button } from "react-bootstrap";

const SubmitInvoice = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const processDataArra = useSelector((state) => state.Common.processingArray)
  const formatedArray = useSelector((state) => state.Common.formatedArray)
  const [selectedOption, setSelectedOption] = useState(null)
  const [productName, setproductName] = useState()
  const [usernameData,setusernameData]=useState()
  const [userDetails,setuserDetails]=useState()
  const [vehicalNumber,setVehicalNumber]=useState()

  useEffect(() => {
    axios.get(url + "username").then((res) => {

      let arr=[]
      setusernameData(res.data)
      res.data.map((i)=>{
        let obj = { value: '', label: '' }
        obj["value"] = i.email
        
        obj["label"] = i.email

        arr.push(obj)
      })
    
      setproductName(arr)
    })

  }, [])


  console.log(formatedArray, "formatedArray")

  const [src, setsrc] = useState('')
  const [name, setName] = useState()
  const [gstNun, setGstNum] = useState()

  const onClicSubmitFun = () => {


    let payloadData = {
      "Status": "pending",
      "GSTNumber": "",
      "Name": "",
      "productIdArr": "",
      "InvoiceProduct": "",
      "AmountPaid": "",
      "DueAmount": "",
      "vehicalNumber":""

    }
    payloadData["productIdArr"] = processDataArra

    payloadData["Name"] = userDetails[0].username

    payloadData["GSTNumber"] = userDetails[0].GstNumber
    payloadData["address"]= userDetails[0].address
    payloadData["phonenumber"]= userDetails[0].phonenumber
    payloadData["InvoiceProduct"] = formatedArray
    payloadData["vehicalNumber"]=vehicalNumber
    axios.post(url + "savequoteData", payloadData).then((res) => {
      console.log(res)

    })
    props.setShow(false)
    props.setPreview(true)
    props.setInvoiceData(payloadData)

  }


const onChangeFun=(e)=>{
  console.log(e,usernameData)
  setSelectedOption(e)
  const data=usernameData.filter((i)=> i.email === e.value  )
console.log(data)
setuserDetails(data)
}



  const onCloseFun = () => {
    props.setShow(false)
  }

  return (<>


    <Modal
      show={props.show}
      onHide={onCloseFun}
      aria-labelledby="ModalHeader"
      centered
      size="xl"
    >
      <Modal.Header closeButton onClick={onCloseFun}>
      <label className=" inputHeader">Please Slect Name</label>
      </Modal.Header>
      <Modal.Body>
        
        <Select

          defaultValue={selectedOption}
          onChange={(e)=>{onChangeFun(e)}}
          options={productName}

        />
        {/* <input type="text" onChange={(e) => { setName(e.target.value) }} /> */}

        {userDetails
         && userDetails.map((i)=>{
          
          return(
           
          <div className="LableDiv">
            <label>Name</label>
            <input type="text" readOnly={true} value={i.username} />
            <br></br>
             
         
            <label>GST Number</label>
      
           <input type="text" readOnly={true} value={i.GstNumber} />
           <br></br>
            <label>Phone Number</label>
           
            <input type="tel" readOnly={true} value={i.phonenumber} />
            <br></br>
            <label>Address</label>
           
            <input type="text" readOnly={true} value={i.address} />
            <br></br>
            <label>Pin Code</label>
      
            <input type="text" readOnly={true} value={i.city} />
            
            <br></br>
         
            </div>
          
          )
         

        })

      }
        
         


          {userDetails && userDetails.length > 0 &&  
          <>
          
          <label>vehical Number</label>
            <input type="text" onChange={(e)=>{setVehicalNumber(e.target.value) }} />
          
            </>
            
            }

        {/* <label className="inputLabel">Enter GST</label>
        <input type="text" onChange={(e) => { setGstNum(e.target.value) }} /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" value={"submit"} onClick={() => { onClicSubmitFun() }}>Submit</Button>
      </Modal.Footer>

    </Modal>



  </>)
}

export default SubmitInvoice;