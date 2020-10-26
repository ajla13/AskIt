import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService'
import '../profile.css';
import Message from './Message';


const ProfileUpdate = props => {
    const { user } = useContext(AuthContext);
    const [newData, setNewData] = useState({ email: "", name: "", surname: "", userId: user._id });
    const [message, setMessage] = useState(null);


    const onChange = e => {
        setNewData({ ...newData, [e.target.name]: e.target.value });

    }
    const resetForm = () => {
        setNewData({ email: "", name: "", surname: "", userId: user._id });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.updateUser(newData).then(data => {
            const { message } = data;

            if (!message.msgError) {

                setMessage(message);

            }
            else {
                console.log(message.msgBody);
                setMessage(message)
            }

            setTimeout(function () {
                window.location.reload();
            }, 1000);
        });
    }
    const cancel = () => {
        window.location.reload();
    }


    return (
        <div >

            <div className="card-body media align-items-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" className="d-block ui-w-80"></img>
                <div className="media-body ml-4">
                    <label className="btn btn-outline-primary">
                        Upload new photo
                      <input type="file" className="account-settings-fileinput"></input>
                    </label> &nbsp;
                     <button type="button" className="btn btn-default md-btn-flat">Reset</button>

                    <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                </div>
            </div>
            <hr className="border-light m-0"></hr>

            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input name="name" onChange={onChange} type="text"
                            className="form-control" placeholder={user.name} required></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Lastname</label>
                        <input name="surname" onChange={onChange} type="text"
                            className="form-control" required placeholder={user.surname}></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input name="email" required onChange={onChange} type="text"
                            className="form-control mb-1" placeholder={user.email}></input>
                    </div>
                    <div className="form-group text-right mt-3">
                        <input type="submit" value="Save changes" className="btn btn-primary" />&nbsp;
              <button type="button" onClick={cancel} className="btn btn-default">Cancel</button>
                    </div>

                </form>

            </div>
            {message ? <Message message={message} /> : null}

        </div>




    );

}

export default ProfileUpdate;