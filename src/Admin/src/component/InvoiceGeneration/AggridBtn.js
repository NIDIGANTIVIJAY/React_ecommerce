import React from 'react';
import { useDispatch,useSelector } from 'react-redux';

const AggridBtn =(props) => {
   const dispatch=useDispatch()
   const processData=useSelector((state)=>state.Common.processingArray
    )
  const buttonClicked = () => {
  
    dispatch(
      {
        type:"PROCESSINGARRAY",
        payload:props.data.ProductId
      }
    )
    dispatch(
      {
        type:"EDITEDPROCESSINGARRAY",
        payload:props.data
      }
    )
    alert(`Item is Added SuccessFully${props.data.ProductId}`);
  };

  return (
    <span>
     <div className='agButton'>
      <button onClick={() => buttonClicked()}>Add Item </button>
      </div>
    </span>
  );
};



export default AggridBtn