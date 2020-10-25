import React, { useState, useContext } from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/Message';
import { AuthContext } from '../context/AuthContext';
import '../login.css'

const Login = props => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });

    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                setMessage(message);
                setTimeout(() => {
                    props.history.push('/');
                }, 2000)
            }
            else
                setMessage(message);
        });
    }

    return (
        <>
           <div id="body">
            <div id="login">
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form onSubmit={onSubmit}>
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label for="email" className="text-info">Email:</label><br />
                                        <input type="text"
                                            name="email"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            onChange={onChange}
                                            className="form-control"
                                            placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="password" className="text-info">Password:</label><br />
                                        <input type="password"
                                            name="password"
                                            onChange={onChange}
                                            className="form-control"
                                            placeholder="Enter Password" />
                                    </div>
                                    <div className="form-group">
                                        <label for="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                                        <input type="submit" name="submit" className="btn btn-info btn-md" value="Log in" />
                                    </div>
                                   
                                </form>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                {message ? <Message message={message} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div> 
        </>
    )
}

export default Login;