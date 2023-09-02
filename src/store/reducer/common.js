import Type from "../type";

const initialState = {
  login: false,
  token: false,
  JsonData: "",
  processingArray: [],
  showModal: false,
  ModalData: "",
  formatedArray: [],
  showModalComp: false,
  showModalComp1: false,
  AmountData: "",
  AccountName : "pending",
  payloadData:[]


};

const Common = (state = initialState, action) => {
  switch (action.type) {


   
    case Type.JSONDATA:
      console.log(action.payload, "JSONDATA");

      return {
        ...state,
        JsonData: action.payload,
      };

    case Type.PROCESSINGARRAY:
      console.log(action.payload, state.processingArray, "processingArray");
      if (action.payload === false) {
        return {
          ...state,
          processingArray: []
        }
      }
      return {
        ...state,
        processingArray: state.processingArray.concat(action.payload)

      }

    case Type.RESETPROCESSINGARRAY:
      console.log(action.payload, initialState.processingArray, "IOUJHF");
      return {
        ...state,
        processingArray: []

      }


    case Type.SHOWMOADALCOMPBOOL:
      console.log(action.payload, state.processingArray, "processingArray");
      return {
        ...state,
        showModalComp1: action.payload
      }


    case Type.SHOWMODAL:
      console.log(action.payload, state.processingArray, "processingArray");
      return {
        ...state,
        showModal: action.payload
      }
    case Type.MODALDATA:
      console.log(action.payload, state.processingArray, "processingArray");
      return {
        ...state,
        ModalData: action.payload
      }



    case Type.EDITEDPROCESSINGARRAY:
      console.log(action.payload, initialState.processingArray, "processingArray");
      if (action.payload === false) {
        return {
          ...state,
          formatedArray: []
        }
      }
      return {
        ...state,
        formatedArray: state.formatedArray.concat(action.payload)
      }

    case Type.REMOVEITEMS:
      console.log(action.payload,state.formatedArray.filter((i)=> i?.ProductUniqId !== action?.payload.ProductUniqId    ), "ppo");
      return {
        ...state,
        formatedArray: state.formatedArray.filter((i)=> i.ProductUniqId !== action.payload.ProductUniqId    )
      }
      case Type.RESETEDITEDPROCESSINGARRAY:
      console.log(action.payload    , "ppo");
      return {
        ...state,
        formatedArray: []
      }



    case Type.SHOWMODALCOMP:
      console.log(action.payload, state.processingArray, "processingArray");
      return {
        ...state,
        showModalComp: action.payload
      }
    case Type.AMOUNTDATA:
      console.log(action.payload, state.processingArray, "processingArray");
      return {
        ...state,
        AmountData: action.payload
      }

      case Type.ACCOUNTNAME:
        console.log(action.payload, state.AccountName, "AccountName");
     
      return {
        ...state,
        AccountName: action.payload
      }
      case Type.PAYLOAD:
        console.log(action.payload, state.AccountName, "AccountName");
     
      return {
        ...state,
        payloadData: state.payloadData.concat(action.payload)
      }
    
      case Type.UPDATEPAYLOAD:
        console.log(action.payload, state.AccountName, "AccountName");
     
      return {
        ...state,
        payloadData:  state.payloadData.map(item =>
          (item.stockId === action.payload.stockId  && item.MonthDates === action.payload.MonthDates)? { ...item, todayProd: action.payload.todayProd } : item
        ),
      }
    

    default:
      return state
  }
};

export default Common;
