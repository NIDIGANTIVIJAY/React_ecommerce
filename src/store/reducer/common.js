import Type from "../type";

const initialState = {
  login: false,
  token: false,
  JsonData:""
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

    default:
      return state
  }
};

export default Common;
