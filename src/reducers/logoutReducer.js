import { LOGOUT } from '../actions/logout';

const initialState = {
  email:null,
  isLoggedIn: false,
  auth:false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default authReducer;
