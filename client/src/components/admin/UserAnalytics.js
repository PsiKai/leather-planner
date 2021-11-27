import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import AuthContext from "../../context/authentication/AuthContext"
import "../../styles/admin.css"
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const UserAnalytics = () => {
    const authContext = useContext(AuthContext);
    const { getUser } = authContext;

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="position-div inside-cover">
            <div className="grid-div">
                <div className="page">
                    <div className="heading">
                        <Link to="/profile" className="profile-nav">
                            <ArrowBackIosIcon />
                            Back
                        </Link>
                        <h1 className="profile-heading">
                            Hello Admin
                            <SupervisorAccountIcon />
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAnalytics
