import './App.css';
import InvoiceGeneration from './component/InvoiceGeneration';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Component from './component';
import Expenses from './component/Expenses';
import Accounts from './component/Accounts';
import Production from './component/Production';
import ProcessInvoice from './component/InvoiceGeneration/processInvoice';
import GenearatedInvoice from './component/InvoiceGeneration/GeneratedInvoice';
function Admin() {


  return (

      
      <Routes>
        <Route path="/" element={<Component />} >
        <Route path="invoice" element={<InvoiceGeneration />} />
        <Route path="invoice/process" element={<ProcessInvoice />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="production" element={<Production />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path='invoice/generatedinvoice' element={<GenearatedInvoice/>}/>
          
         </Route>

       
         
      </Routes>
   


  );
}

export default Admin;
