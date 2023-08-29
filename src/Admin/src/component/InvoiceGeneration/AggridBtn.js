import React from 'react';
import { useDispatch,useSelector } from 'react-redux';

const AggridBtn =(props) => {
   const dispatch=useDispatch()
   const processData=useSelector((state)=>state.Common.processingArray
    )
    const formatArr=useSelector((state)=>state.Common.formatedArray)

    console.log(props.params,"SDEF")
  const buttonClicked = () => {
    //  console.log(formatArr,"FGGG")
    //  let data;
    //  let arr=[]
    //   arr= formatArr.filter((i)=> i?.ProductUniqId === props.data.ProductUniqId )
    //   if(arr.length > 0 ){
    //     console.log( arr)
    //     data=arr
    //   }else{
    //     data=props.data

    //   }
  
  
  
    const copiedObject = { ...props.params.data };
    delete copiedObject["shouldShowButton"]
    console.log(copiedObject)

    props.params.data.shouldShowButton=false
    let s=props.params.data
    console.log(s)
    
    // props.data[props.params.node.rowIndex].shouldShowButton = false;
    // props.setRowData(props.data);
  
    
    dispatch(
      {
        type:"PROCESSINGARRAY",
        payload:props.params.data.ProductId
      }
    )
    dispatch(
      {
        type:"EDITEDPROCESSINGARRAY",
        payload:copiedObject
      }
    )
    alert(`Item is Added SuccessFully${props.params.data.ProductId}`);
  };
 const OnRemoveFun=()=>{
  console.log("In the Remove Function")
  const copiedObject = { ...  props.params.data };
  delete copiedObject["shouldShowButton"]
  console.log(copiedObject)
  props.params.data.shouldShowButton=true
  let s=props.params.data
  dispatch(
    {
      type:"REMOVEITEMS",
      payload:copiedObject
    }
  )
  

 }
  return (
    <span>
     <div className='agButton'>
        {props.params.data.shouldShowButton === true ?
      <button className='AdBtn' style={{backgroundColor: "#64d764",width: "76%"
    }} onClick={() => buttonClicked()}>Add Item </button> :
      <button style={{backgroundColor:"#ff580dcf"}} onClick={() => OnRemoveFun()}>Remove Item </button> }
      </div>
    </span>
  );
};



export default AggridBtn