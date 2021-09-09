import {
    GET_LIST,
    REMOVE_ITEM,
    SET_ITEM,
    SET_LOADING
} from "../types/types";

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_LIST:
            return {
                ...state,
                list: action.payload.list,
                items: action.payload.items,
                date: action.payload.list
            }
        case SET_ITEM:
            return {
                ...state,
                items: action.payload.items,
                list: action.payload.list,
                date: action.payload.list
            }
        case REMOVE_ITEM:
            const filteredItems = state.items.filter(({_id}) => _id !== action.payload)

            return {
                ...state,
                items: filteredItems
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
};