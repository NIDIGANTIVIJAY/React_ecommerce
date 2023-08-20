import { configureStore } from "@reduxjs/toolkit";

import commonReducer from "./reducer/common"
import LoginReducer from "./reducer/login";
export default configureStore({
    reducer:{
        Common:commonReducer,
        
        Login:LoginReducer
    }
})