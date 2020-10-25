import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../profile.css';


const ProfileGeneral = props => {
    const { user } = useContext(AuthContext);
    


    
    return (
        <div className="tab-pane fade active show" id="account-general">

            <div className="card-body media align-items-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" className="d-block ui-w-80"></img>
               
            </div>
            <hr className="border-light m-0"></hr>

            <div className="card-body">

            <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                     {user.name} {user.surname}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.email}
                    </div>
                  </div>
                  

            </div>

        </div>




    );

}

export default ProfileGeneral;