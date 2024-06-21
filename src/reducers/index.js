import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import emailReducer from '../reducers/userEmailReducer'
import authReducer from './logoutReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  email:emailReducer,
  logout:authReducer,
});

export default rootReducer;