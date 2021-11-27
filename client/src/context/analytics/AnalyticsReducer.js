import {
    GET_USERS
} from "../types/types";

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }

}