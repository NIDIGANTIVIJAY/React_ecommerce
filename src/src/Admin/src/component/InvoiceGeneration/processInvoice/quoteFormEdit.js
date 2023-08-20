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
import _ from 'lodash'
const QuoteFormEdit = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const dispatch = useDispatch()
  const ModalData = useSelector((state) => state.Common.ModalData)
  const showModal = useSelector((state) => state.Common.showModal)
  const [showData, setData] = useState()
  const [keys]=useState(Object.keys(ModalData?.InvoiceProduct[0]))
  console.log(ModalData,keys)
  
 
  const [payloadData, setPayloadData] = useState( _.cloneDeep(ModalData))

  

  const OnChangeFun=(e,type)=>{
      let obj={...payloadData}
    
    if (type === "GSTNumber") {
      obj["GSTNumber"] = e.target.value;
    } else if (type === "Name") {
      obj["Name"] = e.target.value;
    } else{
      obj.InvoiceProduct[e.target.id][type]=e.target.value
    
    }
    console.log(e.target.id,obj)
    
    setPayloadData(obj)

  }
  const OnclickFun=(e)=>{
   e.preventDefault()
   console.log(payloadData,"xxxxx")
   axios.post(url+"editquote",payloadData).then((res)=>{
      console.log(res)
   })
   dispatch({
    type:"SHOWMODAL",
    payload:false
   }) 
  }


  
  const onCloseFun = () => {

    dispatch({
      type: "SHOWMODAL",
      payload: false
    })
  }

  return (<>


    <Modal
      show={showModal}
      onHide={onCloseFun}
      aria-labelledby="ModalHeader"
      centered
      size="xl"
    >
      <Modal.Header closeButton onClick={onCloseFun}>
         Invoice Edit 
      </Modal.Header>
      <Modal.Body>
        <form>
          <label>GSTNumber</label>
        <input type="text" defaultValue={ModalData.GSTNumber}  onChange={(e)=>{OnChangeFun(e,"GSTNumber")}} />
        <label style={{marginLeft: "49%", marginRight: "1%"}}>Name</label>
        <input type="text" defaultValue={ModalData.Name} onChange={(e)=>{OnChangeFun(e,"Name")}} />
    



        <h4>Product-List</h4>




        {ModalData.InvoiceProduct && ModalData
          .InvoiceProduct.map((i,index) => {
            return <>
            <br></br>
             <label><b>List{index+1}</b></label>
        <br></br>
        <br></br>
        <br></br>

             <label >{keys[2]}</label>
              <input type="text" defaultValue={i.Price} id={`${index}`} onChange={(e)=>{OnChangeFun(e,keys[2] )}} ></input>
              <label style={{marginLeft: "49%", marginRight: "1%"}}  >{keys[3]}</label>
              <input type="text" defaultValue={i.Item} id={`${index}`}  onChange={(e)=>{OnChangeFun(e,keys[3])}} ></input>
            
        <br></br>
        
              <label>{keys[4]}</label>
              <input type="text" defaultValue={i.Product} id={`${index}`} onChange={(e)=>{OnChangeFun(e,keys[4])}} ></input>
              <label style={{marginLeft: "49%", marginRight: "1%"}} >{keys[7]}</label>
              <input type="text" defaultValue={i.Quantity} id={`${index}`} onChange={(e)=>{OnChangeFun(e,keys[7])}} ></input>
        <br></br>
        

              <label>{keys[5]}</label>
              <input type="text" defaultValue={i.Size} id={`${index}`}  onChange={(e)=>{OnChangeFun(e,keys[5])}} ></input>
              <label style={{marginLeft: "49%", marginRight: "1%"}} >{keys[6]}</label>
              <input type="text" defaultValue={i.Weight} id={`${index}`} onChange={(e)=>{OnChangeFun(e,keys[6])}} ></input>
            </>
          })}









        </form>

  
    

      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={(e)=>{OnclickFun(e)}}>Submit</Button>
      </Modal.Footer>

    </Modal>



  </>)
}

export default QuoteFormEdit;
