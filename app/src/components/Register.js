import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/Message';
import '../register.css';

const Register = props => {
    const [user, setUser] = useState({ email: "", password: "", name: "", surname: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ email: "", password: "", name: "", surname: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(user);
        console.log("here");
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000)
            }
        });
    }



    return (
        <div id="body">
        <div id="login">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form onSubmit={onSubmit}>
                                <h3 className="text-center text-info">Register</h3>
                                <div className="form-group">
                                    <label for="email" className="text-info">Email:</label><br />
                                    <input type="text"
                                        value={user.email}
                                        name="email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Password: </label>
                                    <input type="password"
                                        name="password"
                                        pattern=".{5,}"
                                        value={user.password}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="Enter Password" />
                                </div>
                                <div className="form-group">
                                    <label for="name" className="text-info">Name:</label><br />
                                    <input type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="Enter name" />
                                </div>
                                <div className="form-group">
                                    <label for="lastname" className="text-info">Lastname:</label><br />
                                    <input type="text"
                                        name="surname"
                                        value={user.surname}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="Enter lastname" />
                                </div>

                                <div className="form-group">

                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="Register" />
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
    )
}

export default Register;