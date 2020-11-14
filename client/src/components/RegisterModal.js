import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";

const RegisterModal = (props) => {
    const authContext = useContext(AuthContext);
    const {register} = authContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordTwo: ''
    })

    const {email, password, name, passwordTwo} = user;

    const onChange = (e) =>
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    const onSubmit = (e) => {
        e.preventDefault();
        if (name !== null && email !== null && password !== null && password === passwordTwo) {
            register({
                name,
                email,
                password
            })
        }
        setUser({
            name: '',
            email: '',
            password: '',
            passwordTwo: ''
        })
    }
    return (
        <div id="registerModal" className="modal" style={modalStyle}>
        {/* <div className="modal-content"> */}
        <form onSubmit={onSubmit}>
            <p>Name</p>
            <input type="text" name="name" value={name} onChange={onChange} required autoComplete="off"/>
            <p>Email</p>
            <input type="email" name="email" value={email} onChange={onChange} required autoComplete="off"/>
            <p>Password</p>
            <input type="password" name="password" value={password} onChange={onChange} required autoComplete="off"/>
            <p>Confirm Password</p>
            <input type="password" name="passwordTwo" value={passwordTwo} onChange={onChange} required autoComplete="off"/>
            <input type="submit" value="Register" className="btn modal-close"/>
        </form>
        {/* </div> */}
        </div>
    )


}

    const modalStyle = {
        width: "75%",
        height: "75%"
    }
    
export default RegisterModal