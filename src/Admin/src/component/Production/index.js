import React,{useState,useEffect} from "react"
import {AgGridReact} from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import AddNewItem from "./AddNewItem";
const Production=()=>{
  const url=process.env.REACT_APP_SERVICE_ID

  const [showModal,setShowModal]=useState(false)



  const updateBtn=(props)=>{

    const buttonClicked = () => {
      console.log(props.data)
      axios.post(url+"editData",props.data).then((res)=>{
        setRowData(res.data)
   
     })
    
    };
  
    return (
      <span>
       <div className='agButton'>
        <button onClick={() => buttonClicked()}>Update </button>
        </div>
      </span>
  
    );
  };
  const [coldef,setcoldef]= useState([
    { field: 'Item',editable: true  },
    { field: 'Description',editable: true },
    { field: 'Size',editable: true },
    { field: 'Product' ,editable: true },
    // { field: 'ProductId' },
    { field: 'Price'  ,editable: true },
    {headerName:"Total Quatity", field: 'Quantity', editable: true },
    { field: 'Weight' ,editable: true },
    {field: 'Action' ,cellRenderer:updateBtn }
]);
const [rowData,setRowData]=useState()

// 
useEffect(()=>{
  let arr=[]
  axios.get(url+"jsonData").then((res)=>{
     console.log(res.data)

       res.data.map((i)=>{
          let obj={}
           obj['Item']=i.item
           obj['Description']=i.description
           obj['Price']=i.price
           obj['Product']=i.product
           obj['ProductId']=i.productId
           obj['Quantity']=i.quantity
           obj['Size']=i.size
           obj['Weight']=i.weight
           obj["_id"]=i._id
           arr.push(obj)

       })


 console.log(arr)
 setRowData(arr)

  })
 },[])


 
 












  return(<>
    <h1>Production</h1>
    <button type="submit" onClick={()=>{setShowModal(true)}}>ADD New Item</button>
    <div className="ag-theme-alpine agTable" >
    <AgGridReact columnDefs={coldef} rowData={rowData}
      rowSelection={'multiple'}
      rowMultiSelectWithClick={true}
    />
    </div>

    {showModal && <AddNewItem show={showModal} setShowModal={setShowModal}/>}
  
  </>)
}

export default Production