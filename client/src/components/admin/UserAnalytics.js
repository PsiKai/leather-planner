import React, {useContext, useEffect} from 'react';
import AuthContext from "../../context/authentication/AuthContext"

const UserAnalytics = () => {
    const authContext = useContext(AuthContext);
    const { getUser } = authContext;

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            Hello, Admin
        </div>
    )
}

export default UserAnalytics
