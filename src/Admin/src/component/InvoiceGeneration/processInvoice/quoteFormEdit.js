import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';



import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';

import JsonData from "../../../../../store/action/jsonData";

import { Modal, Button } from "react-bootstrap";
import "../../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import _ from 'lodash'
import Select from 'react-select';
const QuoteFormEdit = (props) => {
  const url = process.env.REACT_APP_SERVICE_ID
  const dispatch = useDispatch()






  // const ModalData = useSelector((state) => state.Common.ModalData)
  // const showModal = useSelector((state) => state.Common.showModal)

  const [keys] = useState(Object.keys(props.editFormData?.InvoiceProduct[0]))
  console.log(props.editFormData, keys)
  const [productName, setproductName] = useState()

  const [selectedOption, setSelectedOption] = useState(null)
  const [showBtn, setShowBtn] = useState(false)
  const [payloadData, setPayloadData] = useState(props.editFormData)
  const [formData, setFormData] = useState(props.editFormData.InvoiceProduct)
  const jsonData = useSelector((state) => state.Common.JsonData)
  useEffect(() => {
    console.log(selectedOption)
    if (jsonData === "") {
      dispatch(JsonData(onSuccess));
    }
  }, [])

  const onSuccess = (res) => {

  }


  const OnChangeFun = (e, type) => {
    let obj = { ...payloadData }

    console.log("ihgq", obj, obj.InvoiceProduct)


    if (type === "GSTNumber") {
      obj["GSTNumber"] = e.target.value;
    } else if (type === "Name") {
      obj["Name"] = e.target.value;
    } else {
      obj.InvoiceProduct[e.target.id][type] = e.target.value
      //  obj1[e.target.id][type]=e.target.value

    }
    console.log("ihg", obj)
    // setFormData(obj.InvoiceProduct)
    setPayloadData(obj)

  }
  const OnclickFun = (e) => {
    e.preventDefault()
    console.log(payloadData, "xxxxx")
    axios.post(url + "editquote", payloadData).then((res) => {
      console.log(res)
      if(res.status === 200){
        props.setShowModal(false)
      }
    })
    //  dispatch({
    //   type:"SHOWMODAL",
    //   payload:false
    //  }) 
    
  }

  const OnclickEditFun = (e) => {
    e.preventDefault()
    let arr = []
    let arr1 = []
    console.log(jsonData)
    jsonData.map((i) => {


      let obj = { value: '', label: '' }



      props.editFormData.InvoiceProduct.map((j) => {
        if (j.Product !== i.product) {
          obj["value"] = i.product
          obj["label"] = i.product
          arr.push(obj)

        } else {
          obj["value"] = i.product
          obj["label"] = i.product
          arr1.push(obj)

        }
      })


    })

    setSelectedOption(arr1)

    setproductName(arr)





    //    axios.get(url+"getProductList").then((res)=>{
    //     console.log(res)

    //    let arr=[]
    //    let arr1=[]
    //     jsonData.data.map((i)=>{


    //       let obj={ value: '', label: '' }



    //       props.editFormData.InvoiceProduct.map((j)=>{
    //         if(j.Product !== i.product){
    //           obj["value"]=i.product
    //           obj["label"]=i.product
    //           arr.push(obj)

    //         }else{
    //           obj["value"]=i.product
    //           obj["label"]=i.product
    //           arr1.push(obj)

    //         }
    //       })


    //     })
    //     setSelectedOption(arr1)

    //     setproductName(arr)

    //  })

  }
  const OnclickAddNewItem = (e) => {
    e.preventDefault()
    console.log(jsonData, "JsonData", selectedOption)
    let arr = []
    let JsonData = [...jsonData]
    let asd = payloadData.InvoiceProduct
    let sd = { ...payloadData }

    let obj = []

    const result = JsonData.filter((Item) => {
      console.log(Item.product === selectedOption.value)
      if (Item.product === selectedOption.value) {
        let obj = {}
        obj['Item'] = Item.item
        obj['Description'] = Item.description
        obj['Price'] = Item.price
        obj['Product'] = Item.product
        obj['ProductId'] = Item.productId
        obj['Quantity'] = Item.quantity
        obj['Size'] = Item.size
        obj['Weight'] = Item.weight
        obj["ProductUniqId"] = Item.ProductUniqId

        sd.InvoiceProduct.push(obj)
        console.log("IN SD", sd)
        setPayloadData(sd)
        return Item
      }
    })

    console.log(sd, "LLKJHdd")





    // setFormData(asd) 
    // setPayloadData(asd)







    console.log(asd, "SD")

  }

  const onCloseFun = () => {

    // dispatch({
    //   type: "SHOWMODAL",
    //   payload: false
    // })
    props.setShowModal(false)
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
      <label className=" inputHeader">Invoice Edit</label>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="LableDiv">
          <label>GSTNumber</label>
          <input type="text" defaultValue={props.editFormData.GSTNumber} onChange={(e) => { OnChangeFun(e, "GSTNumber") }} />
          <br />
          <label >Name</label>
          <input type="text" defaultValue={props.editFormData.Name} onChange={(e) => { OnChangeFun(e, "Name") }} />
          



          <h4>Product-List</h4>




          {
            // props.editFormData && props.editFormData.InvoiceProduct
            //  && props.editFormData.InvoiceProduct

            payloadData.InvoiceProduct.map((i, index) => {
              return <>

          <div className="LableDivEdit">

               
                <label className="ListNameHeader">List{index + 1}</label>
                
                <br />

                <label >{keys[3]}</label>
                <input type="text" defaultValue={i.Price} id={`${index}`} onChange={(e) => { OnChangeFun(e, keys[3]) }} ></input>
                
                <label  >{keys[4]}</label>
                <input type="text" defaultValue={i.Item} id={`${index}`} readOnly={true} onChange={(e) => { OnChangeFun(e, keys[4]) }} ></input>

                <label>{keys[5]}</label>
                <input type="text" defaultValue={i.Product} id={`${index}`} readOnly={true} onChange={(e) => { OnChangeFun(e, keys[5]) }} ></input>
                
                <label >{keys[8]}</label>
                <input type="number" defaultValue={i.Quantity} id={`${index}`} onChange={(e) => { OnChangeFun(e, keys[8]) }} ></input>

                <label>{keys[6]}</label>
                <input type="text" defaultValue={i.Size} id={`${index}`} readOnly={true} onChange={(e) => { OnChangeFun(e, keys[6]) }} ></input>
                
                <label >{keys[7]}</label>
                <input type="text" defaultValue={i.Weight} id={`${index}`} onChange={(e) => { OnChangeFun(e, keys[7]) }} ></input>

                <br />
                <br />

                </div>
              </>
            })}

</div>









        </form>
        {productName !== undefined &&
          <Select

            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={productName}

          />}




      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={(e) => { OnclickFun(e) }}>Submit</Button>
        {productName === undefined ?
          <Button type="submit" onClick={(e) => { OnclickEditFun(e) }}>Add List Item</Button> :
          <Button type="submit" onClick={(e) => { OnclickAddNewItem(e) }}>Add Item</Button>}
      </Modal.Footer>

    </Modal>



  </>)
}

export default QuoteFormEdit;
