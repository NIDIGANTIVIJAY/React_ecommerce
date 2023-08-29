import React, { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from "axios";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import InputFieldComp from "./inputFieldComp";
// import ActionBtn from "./ActionBtn";
import Expenses from "../Expenses/index"
import { useSelector } from "react-redux";
const Accounts = () => {
  const url = process.env.REACT_APP_SERVICE_ID
  
  const accountNav = useSelector((state) => state.Common.AccountName)
 
  console.log(accountNav,"accountNav")
 
  const [reload, setreload] = useState(false)
  const [key, setKey] = useState('pending');
  const InputFieldComp = (props) => {
    const [inputData, setinputData] = useState()
    const onChangeFun = (e) => {
      console.log(e)
      setinputData(e.target.value)
    }
    const onClickFun = () => {
      console.log(props.data)
      const getAccountsApiFun=()=>{
        console.log("sggd")
        let payload1={}
        payload1["status"]="pending"
        axios.post(url + "getAccounts",payload1).then((res) => {
          console.log(res.data)
          setRowData(res.data)
        })
  
      }
      let payload = {}
      payload["AccountID"] = props.data.AccountID
      payload["PaidAmount"] = inputData
      
      axios.post(url + "updateAccount", payload).then((res) => {
        if (res.status === 200) {
          //  setreload(!reload)
          getAccountsApiFun()
        }
      })
      console.log(inputData)
    }
    return (<>

<div className="">
      <input className="dueAmtValue" type="number" onChange={(e) => { onChangeFun(e) }} />
      <button className="AdBtn updateAmt" type="submit" onClick={() => { onClickFun() }}>Update Amount</button>
      </div>
    </>)

  }


  const [coldef, setcoldef] = useState([
    { field: "GSTNumber" },
    { field: "Name" },
    { field: "Status" },
    { field: "TotalAmount" },
    { field: "AmountPaid", headerName: "Amount Paid" },
    { field: "DueAmount" },

    { cellRenderer: InputFieldComp, width: 500, headerName: "Balance Amount" },
    // {field:"Action",cellRenderer: ActionBtn,width:250}
  ]);
  const [coldef1, setcoldef1] = useState([
    { field: "GSTNumber" },
    { field: "Name" },
    { field: "TotalAmount" },
    { field: "AmountPaid", headerName: "Initial Amount Paid" },
    { field: "Status" },

    
  ]);
  useEffect(() => {
    let payload={}


    if(key === "pending"){
    payload["status"]="pending"
    axios.post(url + "getAccounts",payload).then((res) => {
      console.log(res.data)
      setRowData(res.data)
    })
  }
 else if(key === "completed"){
  payload["status"]="completed"
  axios.post(url + "getAccounts",payload).then((res) => {
    console.log(res.data)
    setRowData(res.data)
  })

 }else{

 }




  }, [reload,key])

  const onClicCompleteFun=(e)=>{
    console.log(e)
    if(e === "pending"){
     
      setKey(e)

    }else if(e === "completed"){
      setKey(e)
    }else{
      setKey(e)

    }
  
  }


  const [rowData, setRowData] = useState()

  return (<>
    <h3>Account</h3>
    <Tabs
      defaultActiveKey= {accountNav}
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={(e) =>onClicCompleteFun(e)}
    >
      <Tab eventKey="pending" title="Pending Invoice">
           <h3>Pending Invoice</h3>
        <div className="ag-theme-alpine agTable" >

          <AgGridReact columnDefs={coldef} rowData={rowData}
            gridOptions={true}


          />
        </div>
      </Tab>
      <Tab eventKey="completed" title="Completed Invoice"  >
      <h3>Completed Invoice</h3>
        <div className="ag-theme-alpine agTable" >

          <AgGridReact columnDefs={coldef1} rowData={rowData}
            gridOptions={true}


          />
        </div>
      </Tab>
      <Tab eventKey="Expense" title="Expense" >
      <Expenses/>
      </Tab>
    </Tabs>


  </>)
}

export default Accounts