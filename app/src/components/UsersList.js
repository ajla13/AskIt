import React, { useContext, useState, Component, useEffect } from 'react';
import AuthService from '../services/AuthService'
import User from './User';
import '../userList.css';
import Message from './Message';

const UsersList = props => {
    const [message, setMessage] = useState({ msgBody: "Loading...", msgError: false });
    const [users, setUsers] = useState([]);

    useEffect(() => {

        AuthService.getUsers().then(data => {
            if (!data.length) {
                setMessage({ msgBody: "No Users", msgError: true })
            }
            else {
                setMessage(null);
            }
            setUsers(data);
        });
    }, []);


    return (
        <div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">
                            <div className="table-responsive">
                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>User</span></th>
                                            <th><span>Answers</span></th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map(user => {
                                                return <User key={user._id} user={user} />
                                            })
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {message ? <Message message={message} /> : null}



        </div>

    );

}

export default UsersList;