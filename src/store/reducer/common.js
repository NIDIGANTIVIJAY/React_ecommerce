import Type from "../type";

const initialState = {
  login: false,
  token: false,
  JsonData:"",
  processingArray:[],
  showModal:false,
  ModalData:"",
  formatedArray:[],
  showModalComp:false,
  AmountData:""
};

const Common = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case Type.TOKEN:
    console.log(action.payload, "Token");
     return {
         ...state,
         token: action.payload
      }

    case Type.LOGIN:
      console.log(action.payload, "LOgin");

      return {
        ...state,
        login: action.payload,
      };
      case Type.JSONDATA:
        console.log(action.payload, "JSONDATA");
  
        return {
          ...state,
          JsonData: action.payload,
        };

        case Type.PROCESSINGARRAY:
          console.log(action.payload, state.processingArray,"processingArray");
          return { 
            ...state,
            processingArray: state.processingArray.concat(action.payload)
         }
         case Type.SHOWMODAL:
          console.log(action.payload, state.processingArray,"processingArray");
          return { 
            ...state,
            showModal: action.payload
         }
         case Type.MODALDATA:
          console.log(action.payload, state.processingArray,"processingArray");
          return { 
            ...state,
            ModalData: action.payload
         } 
         case Type.EDITEDPROCESSINGARRAY:
          console.log(action.payload, state.processingArray,"processingArray");
          return { 
            ...state,
            formatedArray: state.formatedArray.concat(action.payload)
         } 
         case Type.SHOWMODALCOMP:
          console.log(action.payload, state.processingArray,"processingArray");
          return { 
            ...state,
            showModalComp: action.payload
         } 
         case Type.AMOUNTDATA:
          console.log(action.payload, state.processingArray,"processingArray");
          return { 
            ...state,
            AmountData: action.payload
         } 
    

    default:
      return state
  }
};

export default Common;
