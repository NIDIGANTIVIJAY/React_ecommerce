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

const QuoteFormEdit = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const dispatch = useDispatch()
  const ModalData = useSelector((state) => state.Common.ModalData)
  const showModal = useSelector((state) => state.Common.showModal)
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

      </Modal.Header>
      <Modal.Body>

        <input type="text" defaultValue={ModalData.GSTNumber} />
        <input type="text" defaultValue={ModalData.Name} />
        {ModalData.InvoiceProduct && ModalData
          .InvoiceProduct.map((i) => {
            return <>
              <input type="text" defaultValue={i.item}></input>

              <input type="text" defaultValue={i.price}></input>

              <input type="text" defaultValue={i.product}></input>

              <input type="text" defaultValue={i.quantity}></input>

              <input type="text" defaultValue={i.size}></input>

              <input type="text" defaultValue={i.weight}></input>
            </>
          })}


      </Modal.Body>

    </Modal>



  </>)
}

export default QuoteFormEdit;