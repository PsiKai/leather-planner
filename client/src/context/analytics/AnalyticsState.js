import React, { useReducer } from 'react';
import axios from 'axios';
import AnalyticsContext from "./AnalyticsContext";
import AnalyticsReducer from "./AnalyticsReducer";
import {
    GET_USERS
} from "../types/types";

const AnalyticsState = (props) => {

    const intitialState = {
        users: [],
        lastestSnapshot: {},
        loading: true
    }
    const [state, dispatch] = useReducer(AnalyticsReducer, intitialState);

    const getAllUsers = async () => {
        try {
            const res = await axios.get('/admin/users')
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const createUserSnapshot = async (userData) => {
        try {
            await axios.post('/admin/users', userData)
        } catch (error) {
            console.log(error.response.msg)
        }
    }

    return (
        <AnalyticsContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                latestSnapshot: state.latestSnapshot,
                getAllUsers,
                createUserSnapshot
            }}>
            {props.children}
        </AnalyticsContext.Provider>
    )
}

export default AnalyticsState;
