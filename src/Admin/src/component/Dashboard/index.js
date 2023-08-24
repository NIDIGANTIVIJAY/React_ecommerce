import React, { useState } from "react";
import ModaComponent from "./ModalCompon";


const Dashboard=()=>{

  const [showModal,setModal]=useState(false)

    return(<>
    <h1>Dashboard</h1>
    <button type="submit" onClick={()=>{setModal(true)}}>Add user</button>
    
    {showModal && <ModaComponent show={showModal} setShowModal1={setModal}/> }
    
    </>)
}

export default Dashboard