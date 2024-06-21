import { LOGIN_SUCCESS, UPDATE_BALANCE , ANGEL_ID ,DELETE,BROKER_LOGIN,AUTH,ADDITEM, REMOVEITEM,USERSCHEMAREDUX , ALLCLIENTDATA} from '../actions/actions';
import { LOGOUT } from '../actions/logout';

const initialState = {
  items:[],
  balance: 0,
  isLoggedIn: false,
  allClientData: {},
  angelId:'',
  angelPass:'',
  brokerLogin:false,
  auth:false,
  userSchemaRedux:{}
};

const accountReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        balance: action.payload.data.data.net 
      };
    case UPDATE_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    case LOGOUT:
      return{
        ...state,
        angelId:'',
        angelPass:'',
        brokerLogin:false,
        userData: {},
        isLoggedIn: false,
      }
    case DELETE:
      return{
        ...state,
        isLoggedIn:false
      }
    case  ANGEL_ID:
      return{
        ...state,
        angelId:action.payload.id,
        angelPass: action.payload.pass
      }
    case BROKER_LOGIN:
      return{
        ...state,
        brokerLogin:action.payload
      }  
    case AUTH:
      return{
        ...state,
        auth:action.payload
      }  
    case USERSCHEMAREDUX:
      return{
        ...state,
        userSchemaRedux:action.payload
      }  
    case ADDITEM:
      return {
        ...state,
        items: [...state.items,action.payload]
      };
    case REMOVEITEM:{
      return{
        ...state,
        items:[]
      }
    }
    case ALLCLIENTDATA:{
      return{
        ...state,
        allClientData:action.payload
      }
    }
    
    default:
      return state;
  }
};

export default accountReducer;