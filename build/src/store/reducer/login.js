import Type from "../type"

const initialState={
    loginDetails:false
}
const LoginReducer=(state=initialState,action)=>{
      switch(action.Type){

         case Type.USER:
                return{
                    ...state,
                    loginDetails:action.payload
                }
           
              
         

         default:
            return state

      }


}

export default LoginReducer