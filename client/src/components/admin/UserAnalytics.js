import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import AuthContext from "../../context/authentication/AuthContext"
import AnalyticsState from '../../context/analytics/AnalyticsState';
import "../../styles/admin.css"
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Alert from "../Alert"
import UserData from "./UserData"

const UserAnalytics = () => {
    const authContext = useContext(AuthContext);
    const { getUser } = authContext;

    useEffect(() => {
        getUser()
    }, [])

    return (
        <AnalyticsState>
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
                        <div>
                            <UserData />
                        </div>
                    </div>
                </div>
                <img
                    className="binder-rings"
                    src="./images/binder-rings.webp"
                    alt="binder rings"
                />
                <img
                    className="binder-rings-two"
                    src="./images/binder-rings.webp"
                    alt="binder rings"
                />
                <Alert />
            </div>
        </AnalyticsState>
    )
}

export default UserAnalytics
