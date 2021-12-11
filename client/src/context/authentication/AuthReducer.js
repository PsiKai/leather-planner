
import { 
    LOGIN_SUCCESS, 
    LOG_OUT, 
    REGISTER_SUCCESS, 
    USER_LOADED, 
    SET_ALERT,
    REMOVE_ALERT 
} from "../types/types";

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                isAdmin: action.payload.admin
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            }
        case LOG_OUT:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false,
                
            }
        case SET_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.payload)
            }
        default: 
            return state;
    }
}