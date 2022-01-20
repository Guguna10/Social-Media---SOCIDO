import { GLOBALTYPES } from "../actions/globalTypes"
import { getDataAPI } from "../../utils/fetchData"

export const SUGGES_TYPES = {
    LOADING: "LOADING_SUGGES",
    GET_USERS: "LOADING_GET_USERS_SUGGES",
}

export const getSuggestions = (token) => async (dispatch) => {
    try {
        dispatch({type: SUGGES_TYPES.LOADING, payload: true})

        const res = await getDataAPI("suggestionUser", token)
        
        dispatch({type: SUGGES_TYPES.GET_USERS, payload: res.data})

        dispatch({type: SUGGES_TYPES.LOADING, payload: false})

    } catch (err) {
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}