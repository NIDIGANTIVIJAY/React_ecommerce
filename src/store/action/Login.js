import axios from "axios"
import { useDispatch } from "react-redux"


export const LoginFun=(email,password,onSuccess)=>(dispatch)=>{
    const url =process.env.REACT_APP_SERVICE_ID
 
   
    axios.post(url + "user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("in nav",res.data.user.token[0].token) ;
        // setToken(res.data.user.token[0].token)

          if(res.status === 200){
            dispatch({
                type:"TOKEN",
                payload:res.data.user.token[0].token
               })
               
               dispatch({
                type:"LOGIN",
                payload:true
               })
               onSuccess(res)
          }
          
    
      
      });
  

}