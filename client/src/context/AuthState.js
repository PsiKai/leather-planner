import React, {useReducer} from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import setAuthToken from "../utils/setAuthToken"
import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOG_OUT,
    USER_LOADED
} from "./types"

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const getUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/getUser')

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({type: LOG_OUT})
        }
    }

    const register = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post("/register", formData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            getUser();
        } catch (err) {
            dispatch({
                type: LOG_OUT
            })
        }
    }

    const login = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post("/login", formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            getUser();
        } catch (err) {
            dispatch({
                type: LOG_OUT
            })
        }
    }
    
    const logOut = () => dispatch({type: LOG_OUT})

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                getUser,
                register,
                login,
                logOut
            }}>
                {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;