import React, {useReducer, useContext} from 'react';
import axios from 'axios';
import AnalyticsContext from "./AnalyticsContext";
import AuthContext from "../authentication/AuthContext";
import AnalyticsReducer from "./AnalyticsReducer";
import {
    GET_USERS
} from "../types/types";

const AnalyticsState = (props) => {
    const authContext = useContext(AuthContext)
    const { setAlert } = authContext

    const intitialState = {
        users: [],
        loading: true
    }
    const [state, dispatch] = useReducer(AnalyticsReducer, intitialState);

    const getAllUsers = async () => {
        try {
            const res = await axios.get('/admin/users')
            // console.table(res.data);
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        } catch (error) {
            const { msg, status } = error.response
            setAlert(status, msg)
        }
    }

    const createUserSnapshot = async (userData) => {
        try {
            const res = await axios.post('/admin/users', userData)
            console.log(res.data.msg);
        } catch (error) {
            console.log(error.response.msg)
        }
    }

    return (
        <AnalyticsContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                getAllUsers,
                createUserSnapshot
            }}>
            {props.children}
        </AnalyticsContext.Provider>
    )
}

export default AnalyticsState;
