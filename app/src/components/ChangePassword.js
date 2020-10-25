import React, { useState, useContext, useEffect } from 'react'; 
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService'
import '../profile.css';
import Message from './Message';

const ChangePassword = props => {
    const { user } = useContext(AuthContext);
    const [newData, setNewData] = useState({ pass: "", newPass: "", repeat: "",userId:user._id });
    const [message,setMessage] = useState(null);
   

    const onChange = e => {
        setNewData({ ...newData, [e.target.name]: e.target.value });

    }
    const resetForm = ()=>{
        setNewData({ pass: "", newPass: "", repeat: "",userId:user._id });
    }

    const onSubmit =e => {
        e.preventDefault();
        AuthService.updatePass(newData).then(data => {
            const { message } = data;
            //resetForm();
            if(!message.msgError){
                
                setMessage(message);
               
            }
            else{
                console.log(message.msgBody);
                 setMessage(message)
            }
            
            setTimeout(function () {
                window.location.reload();
             }, 1000);
         
        });
    }
    const cancel =()=>{
      window.location.reload();
    }
   
    return (
       
        <div>
        <div className="card-body pb-2">
          <form onSubmit={onSubmit}>
            <div className="form-group">
                <label className="form-label">Current password</label>
                <input required type="password" onChange={onChange} className="form-control" name="pass"></input>
            </div>

            <div className="form-group">
                <label className="form-label">New password</label>
                <input required type="password" onChange={onChange} className="form-control" name="newPass"></input>
            </div>

            <div className="form-group">
                <label className="form-label">Repeat new password</label>
                <input required type="password" onChange={onChange} className="form-control" name="repeat"></input>
            </div>
            <div className="form-group text-right mt-3">
              <input type="submit"  value="Save changes" className="btn btn-primary" />&nbsp;
              <button type="button" onClick={cancel} className="btn btn-default">Cancel</button>
            </div>
            </form>
        </div>
        {message ? <Message message={message}/> : null}
    </div>



    );

}

export default ChangePassword;