import { SET_EMAIL } from "../actions/email_action";

const initialState={
    email:null
};

const emailreducer =(state=initialState,action)=>{
    switch(action.type){
        case SET_EMAIL:
            return{
                ...state,
                email:action.payload
            };
        
            default:
                return state;
        
    }
}

export default emailreducer