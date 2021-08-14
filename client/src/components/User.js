import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext";
import AppContext from "../context/AppContext"
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

const User = () => {
    const authContext = useContext(AuthContext);
    const { user, logOut } = authContext;
    const appContext = useContext(AppContext)

    const userName = user && user.name

    const logoff = () => {
        logOut();
        appContext.resetDate()
    }

    return (
        <div className="user">
            <FormLabel className="user-nav">
                <Link to="/profile">
                    <span>{userName}</span>
                    <PersonIcon />
                </Link>
            </FormLabel>
            <Button size="small" onClick={logoff}>
                Logout
                <ExitToAppIcon></ExitToAppIcon>
            </Button>
        </div>
    )
}

export default User
