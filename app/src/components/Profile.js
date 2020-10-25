import React, { useState, useContext, useEffect } from 'react';
import Question from './Question';
import QuestionService from '../services/QuestionService';
import Message from './Message';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService'
import '../profile.css';
import ProfileGeneral from './ProfileGeneral';
import ProfileUpdate from './ProfileUpdate';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ChangePassword from './ChangePassword';


const Profile = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);


    return (
        <div>
            <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
                <Tab eventKey="general" title="General">
                    <ProfileGeneral></ProfileGeneral>

                </Tab>
                <Tab eventKey="update" title="Update Information">
                    <ProfileUpdate></ProfileUpdate>
                </Tab>
                <Tab eventKey="pass" title="Change Password" >
                    <ChangePassword></ChangePassword>
                </Tab>
            </Tabs>



        </div>

    );

}

export default Profile;