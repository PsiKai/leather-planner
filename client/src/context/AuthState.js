import React, { useReducer } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import setAuthToken from "../utils/setAuthToken"
import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOG_OUT,
    USER_LOADED,
    SET_ALERT,
    REMOVE_ALERT
} from "./types"


const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null,
        loading: true,
        alerts: []
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const getUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        } else {
            dispatch({type: LOG_OUT})
            setAlert("You have been logged out")
        }
        try {
            const res = await axios.get('/user/auth')

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({type: LOG_OUT})
            setAlert(err.response.data.msg)
            console.error(err.response, this);
        }
    }

    const register = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post("/user/register", formData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            getUser();
        } catch (err) {
            console.error(err.response);
            setAlert(err.response.data.msg)
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
            const res = await axios.post("/user/login", formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            getUser();
        } catch (err) {
            setAlert(err.response.data.msg)
            dispatch({
                type: LOG_OUT
            })
        }
    }

    const logOut = () => dispatch({ type: LOG_OUT })

    const setAlert = (msg) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, id }
        })
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, 5000)
    }


    const moveItem = async (item) => {
        const res = await axios.post(
            "/item/move",
            item,
            { "Content-Type": "*/*" }
        )
        console.log(res.data.msg);
        setAlert(res.data.msg);
    }


    const deleteItem = async (item) => {
        const res = await axios.delete(
            '/item/delete',
            { data: item },
            // {"Content-Type": "*/*"}
        )
        setAlert(res.data.msg)

        return res.status
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                alerts: state.alerts,
                deleteItem,
                moveItem,
                getUser,
                register,
                login,
                logOut,
                setAlert
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;