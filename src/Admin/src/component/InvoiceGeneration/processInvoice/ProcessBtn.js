import axios from 'axios';
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';

const ProcessBtn =(props) => {
   const dispatch=useDispatch()
  const url=process.env.REACT_APP_SERVICE_ID

   const processData=useSelector((state)=>state.Common.processingArray
    )


  const buttonsave = () => {
      let obj=props.data
      obj["Status"]="Completed" 
      console.log(obj)
        dispatch({
          type:"SHOWMODALCOMP",
          payload:true
        })


       dispatch({
          type:"AMOUNTDATA",
          payload:obj
        })

        
     
  };

  const onClickEditFun=()=>{
       dispatch({
        type:"SHOWMODAL",
        payload:true
       })   

       dispatch({
        type:"MODALDATA",
        payload:props.data
       })
  }
  const onClickRemove =()=>{
    console.log(props)
    let payload={
        "GST":""
    };
    payload["GST"]=props.data.GSTNumber
    console.log(payload)
    axios.post(url+"removequote",payload).then((res)=>{
        console.log(res)
        props.api.setRowData(res.data)
    })
  }

  return (
    <span>
     
      <button onClick={() => onClickRemove()}>Remove </button>
      &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
      <button onClick={() => onClickEditFun()}>Edit </button>
      &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
      <button onClick={() => buttonsave()}>Confirm </button>
    
    </span>
  );
};



export default ProcessBtn