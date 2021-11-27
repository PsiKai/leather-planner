import React, {useReducer} from 'react';
import axios from 'axios';
import AnalyticsContext from "./AnalyticsContext";
import AnalyticsReducer from "./AnalyticsReducer";
import {
    GET_USERS
} from "../types/types";

const AnalyticsState = (props) => {
    const intitialState = {
        user: []
    }
    const [state, dispatch] = useReducer(AnalyticsReducer, intitialState);

    const getAllUsers = async () => {
        try {
            const users = await axios.get('/admin/users')
            dispatch({
                type: GET_USERS,
                payload: users
            })
        } catch (error) {
            const { msg, status } = error.response
            setAlert(status, msg)
        }
    }

    return (
        <AnalyticsContext.Provider
            value={{
                users: state.users,
                getAllUsers
            }}>
            {props.children}
        </AnalyticsContext.Provider>
    )
}

export default AnalyticsState;
