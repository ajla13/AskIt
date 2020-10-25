import React, {useContext} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import QuestionDetails from './components/QuestionDetails'
import MyQuestions from './components/MyQuestions';
import Profile from './components/Profile';
import PrivateRoute from './Routes/PrivateRoute';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import NewPost from './components/NewPost';


function App() {
  return (
    <>
    <div>
      <NotificationContainer/>
    </div>
    <Router>
      <div className="container">
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/myQuestions" component={MyQuestions}/>
      <Route path="/:authorId/:questionId" component={QuestionDetails}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/ask" component={NewPost}/>
      </div>
    </Router>
    </>
  );
}

export default App;

