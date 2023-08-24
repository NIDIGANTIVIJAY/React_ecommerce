import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import  "./processing.css"


import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import axios from "axios";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import ProcessBtn from "./ProcessBtn";
import QuoteFormEdit from "./quoteFormEdit";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GenearatedInvoice from "../GeneratedInvoice";
import AmountModal from "./AmountModal";

const ProcessInvoice = () => {
  const nav = useNavigate();
  // const showModal = useSelector((state) => state.Common.showModal);
  // const showModal1 = useSelector((state) => state.Common.showModalComp1);
const [showModal,setShowModal]=useState(false)

  const [ModalData,setModalData]=useState()

const [editFormData,setEditFormData]=useState()
const [showModal1,setShowModal1]=useState(false)
  const url = process.env.REACT_APP_SERVICE_ID;
  

  const [rowData, setRowData] = useState();

  useEffect(() => {
    axios.get(url + "getpendingquote").then((res) => {
      console.log(res.data);

    
      setRowData(res.data);
    });
  }, [showModal1]);



const functbtnFunc=(props)=>{
  console.log(props)
  const buttonsave = () => {
    let obj=props.data
    obj["Status"]="Completed" 
    console.log(obj)

    setShowModal1(true)
    setModalData(obj)
    //   dispatch({
    //     type:"SHOWMOADALCOMPBOOL",
    //     payload:true
    //   })


    //  dispatch({
    //     type:"AMOUNTDATA",
    //     payload:obj
    //   })

      
   
};

const onClickEditFun=()=>{
    //  dispatch({
    //   type:"SHOWMODAL",
    //   payload:true
    //  })   
    setShowModal(true)
    setEditFormData(props.data)
    //  dispatch({
    //   type:"MODALDATA",
    //   payload:props.data
    //  })
}
const onClickRemove =()=>{
  console.log(props)
  let payload={
      "_id":""
  };
  payload["_id"]=props.data._id
  console.log(payload)
  axios.post(url+"removequote",payload).then((res)=>{
      console.log(res)
      props.api.setRowData(res.data)
  })
}

return (
  <span>
   <div className='agButton'>
    <button onClick={() => onClickRemove()}>Remove </button>
    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
    <button onClick={() => onClickEditFun()}>Edit </button>
    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
    <button onClick={() => buttonsave()}>Confirm </button>
  </div>
  </span>
);
};



const [coldef, setcolDef] = useState([
  { field: "GSTNumber" },
  { field: "Name" },
  { field: "TotalQuatity" },

  { field: "TotalAmount" },

  { field: "Status" },
  { field: "Action", cellRenderer: functbtnFunc, width: 500 },
]);











  return (
    <>
      <div className="processWrapper">
        <h1>Processing Invoice</h1>

        <div className="ag-theme-alpine agTable" >
          <AgGridReact columnDefs={coldef} rowData={rowData} />
        </div>

        <div>{showModal && <QuoteFormEdit show={showModal} setShowModal={setShowModal} editFormData={editFormData} />}</div>
        <div className="Button">
          <button
            type="submit"
            onClick={() => {
              nav("/admin/invoice/generatedinvoice");
            }}
            value={"GenearatedInvoice"}
          >
            {" "}
            GenearatedInvoice{" "}
          </button>
        </div>
        <div>{showModal1 && <AmountModal show={showModal1} setShowModal1={setShowModal1} ModalData={ModalData}/>}</div>
      </div>
    </>
  );
};

export default ProcessInvoice;
