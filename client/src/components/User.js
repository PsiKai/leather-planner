import React, {useContext} from 'react'
import AuthContext from "../context/AuthContext";
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

const User = () => {
    const authContext = useContext(AuthContext);
    const {user, logOut} = authContext;

    const userName = user && user.name

    const logoff = () => {
        logOut();
      }
      
    return (
        <div className="user">
            <FormLabel>
                <span>{userName}</span>
                <PersonIcon />
            </FormLabel>
            <Button size="small" onClick={logoff}>
                Logout
                <ExitToAppIcon></ExitToAppIcon>
            </Button>
        </div>
    )
}

export default User
