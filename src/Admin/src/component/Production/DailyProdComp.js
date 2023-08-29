import React, { useState, useEffect } from "react"
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { useNavigate } from "react-router";
import ModalComp from "./ModalComp";
import InputFieldComp from "../Accounts/inputFieldComp";
import InputCompJS from "./InputCompJS";
import { useDispatch, useSelector } from "react-redux"
import DatePicker from "react-datepicker";
import AddNewItem from "./AddNewItem";

import "react-datepicker/dist/react-datepicker.css";

const DailyProd = () => {
    const pay = useSelector((state) => state.Common.payloadData)
    const [rowData, setRowData] = useState()
    const [showModal, setShowModal] = useState(false)
    const [payload, setpayload] = useState([])
    const url = process.env.REACT_APP_SERVICE_ID
    const [startDate, setStartDate] = useState(new Date());

    const [coldef, setcoldef] = useState();

    console.log(payload);
    const InputField = (props) => {
        let enableRead = props.enable


        const onChangeFun = (e) => {
            console.log(props.payload, payload)
            // let obj=[...payload]
            //   if(obj.some((i)=>i.stockId === props.params.data.stockId)){
            //     console.log(obj,obj.some((i)=>i.stockId === props.params.data.stockId))

            //   }else{
            let obj = {}
            let arr = []
            obj["stockId"] = props.params.data.stockId
            let s = props.params.colDef.field.split("/")
            console.log(s)
            obj["Month"] = s[1]
            obj["MonthDates"] = props.params.colDef.field
            obj["todayProd"] = e.target.value
            arr.push(obj)
            console.log(arr)
            setpayload(...props.payload, arr)

            //   }
            console.log(e, props.params)
        }
        return (<>


            <input type="number" readOnly={!enableRead} onChange={(e) => { onChangeFun(e) }} />
        </>)

    }

    // CustomHeader.js
    useEffect(() => {

        if (coldef === undefined) {


            // Get the current date
            const today = new Date();

            // Calculate the last 3 days
            const lastThreeDaysFormatted = [];
            for (let i = 1; i <= 3; i++) {
                const previousDay = new Date(today);
                previousDay.setDate(today.getDate() - i);

                const day = previousDay.getDate();
                const month = previousDay.getMonth() + 1; // Months are zero-based
                const year = previousDay.getFullYear();

                const formattedDate = `${day}/${month}/${year}`;
                lastThreeDaysFormatted.push(formattedDate);
            }

            // Print the last 3 days in the desired format
            console.log(lastThreeDaysFormatted);


            let arr = [
                { headerName: "Stock", field: 'product', editable: true },

                { headerName: "Size", field: 'size', editable: true },
                { headerName: "HSN NO", field: 'Hsno', editable: true },



            ]

            let date = new Date()
            let dateday = date.getDate()
            let dateMonth = date.getMonth() + 1
            let dateYear = date.getFullYear()
            let todayDate1 = dateday + '/' + dateMonth + "/" + dateYear;

            const currentDate = new Date();
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

            const headerDates = Array.from({ length: daysInMonth }, (_, index) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);


                let dateday = date.getDate()
                let dateMonth = date.getMonth() + 1
                let dateYear = date.getFullYear()
                let todayDate = dateday + '/' + dateMonth + "/" + dateYear;


                console.log(todayDate === todayDate1, todayDate, todayDate1, "4147")



                let showDtaes = todayDate === todayDate1
                  if(todayDate === todayDate1){
                    showDtaes=true
                  }else if(todayDate === lastThreeDaysFormatted[0]){
                    showDtaes=true
                  }
                  else if(todayDate === lastThreeDaysFormatted[1]){
                    showDtaes=true
                  }
                  else if(todayDate === lastThreeDaysFormatted[2]){
                    showDtaes=true
                  }else{
                    showDtaes=false
                  }



                let obj = {
                    headerName: "", field: "", cellRenderer: (param) => <InputCompJS params={param} enable={showDtaes}
                        payload={payload} setpayload={setpayload}
                        lastThreeDaysFormatted={lastThreeDaysFormatted} />
                }


                obj["headerName"] = todayDate
                obj["field"] = todayDate

                arr.push(obj)
            })
            console.log(arr, "sd")
            setcoldef(arr)



            axios.get(url + "getStock").then((res) => {
                setRowData(res.data)
            })
        }

    }, [])




    const onSubmitDaily = () => {
        console.log(pay, "pay")
        axios.post(url + "submitDailyReport", pay).then((res) => {
            console.log(res)
        })

    }

    const onChangeFunData = (data) => {
        console.log(data)
        let date = new Date(data)
        let dateday = date.getDate()
        let dateMonth = date.getMonth() + 1
        let dateYear = date.getFullYear()
        console.log(dateYear, "KKK")
        let obj = {}
        obj["year"] = dateYear
        obj["month"] = dateMonth
        setStartDate(data)
        axios.post(url + "dateChange", obj).then((res) => {
            console.log(res)

        })
    }


      




    return (<>

        <h1>Daily Production</h1>
        <DatePicker selected={startDate} readOnly={true} onChange={(date) => onChangeFunData(date)} />

        <div className="Button">
            <button className="AdBtn" type="submit" onClick={() => { setShowModal(true) }}>Add Stock</button>

        </div>
        <div className="ag-theme-alpine agTable" >
            <AgGridReact columnDefs={coldef}
                rowData={rowData}
                rowSelection={'multiple'}
                rowMultiSelectWithClick={true}
            />
        </div>
        <div>

            {/* <ModalComp show={showModal} setShowModal={setShowModal} setRowData={setRowData} /> */}

        </div>
        <div className="Button">
            <button className="AdBtn" type="submit" onClick={() => { onSubmitDaily() }}>Submit</button>

        </div>



    {showModal && <AddNewItem show={showModal} setShowModal={setShowModal}/>}










    </>)

}

export default DailyProd;