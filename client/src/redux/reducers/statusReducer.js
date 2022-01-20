import { GLOBALTYPES } from "../actions/globalTypes"


const stateReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.STATUS:
            return action.payload;
        default:
            return state;
    }
}


export default stateReducer