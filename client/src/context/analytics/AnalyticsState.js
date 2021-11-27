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
        dispatch({
            type: GET_USERS,
            payload: []
        })
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
