
import React, { useContext, useState, Component, useEffect } from 'react';
import Questions from './Questions';
import { AuthContext } from '../context/AuthContext';
import QuestionService from '../services/QuestionService'
import UserList from './UsersList';
import {NotificationManager} from 'react-notifications';
import AuthService from '../services/AuthService';
import '../background.css';

let arrayForHoldingPosts = [];
const postsPerPage = 20;

const Home = props => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [content, setContent] = useState({ content: "", email: user.email });
  const [postsToShow, setPostsToShow] = useState([]);
  let [questions, setQuestions] = useState([]);
  let [sortedQuestions, setSortedQuestions] = useState([]);
  const [next, setNext] = useState(2);
  const[shown,setShown]=useState(false);

  useEffect(() => {
    QuestionService.getQuestions().then(data => {
     
      loopWithSlice(0, postsPerPage,data);
      setQuestions(data);

      QuestionService.getSortedQuestions().then(data => {
        setSortedQuestions(data);
      })

    })
  }, []);


  const onShowNotification=()=>{
   
    for(let i=0;i<user.notifications.length;i++){
      let text=user.notifications[i].commentedBy
      NotificationManager.success(text+" repliedon your post","New comment",5000);
    }
    AuthService.popNotifications(user._id).then(data=>{
              console.log(data);
    })
    setShown(true);
}

  const loopWithSlice = (start, end,data) => {
    if (end >= data.length) {
      end = data.length;
    }
    const slicedPosts = data.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    setPostsToShow(arrayForHoldingPosts);
  };


  const handleShowMorePosts = () => {
    loopWithSlice(next, next + postsPerPage,questions);
    setNext(next + postsPerPage);
  };

  const loadButton = () => {
    if(questions.length){
    if (postsToShow.length >= questions.length) {
      return (
        <button style={{margin:30+"px"}} disabled className="btn btn-primary" onClick={handleShowMorePosts}>Load more</button>
      )
    }
    else {
      return (
        <button style={{margin:30+"px"}} className="btn btn-primary" onClick={handleShowMorePosts}>Load more</button>
      )
    }
  }
  }


  const onChange = e => {
    setContent({ ...content, [e.target.name]: e.target.value });

  }
  const resetForm = () => {
    document.getElementById("formQuestion").reset();
  }
  const onSubmit = e => {
    e.preventDefault();
    QuestionService.postQuestion(content).then(data => {
     
      resetForm();
      QuestionService.getQuestions().then(data => {
      
        loopWithSlice(next, next + postsPerPage,data)
        setQuestions(data);
      })
    });
   
  }



  const authenticatedHome = () => {
    return (
      <div>
        {!shown?onShowNotification():null}
        
      </div>
    )
  }


 
  return (
     
    <div>
      <br></br><br></br>
      { !isAuthenticated ? null : authenticatedHome()}
      <div>
        <h4 className="text-center text-info">Recent questions</h4>
      </div>
      <div>
        <Questions questions={postsToShow}></Questions>
        {loadButton()}
        <br></br><br></br><br></br><br></br>
        <div>
          <h4 className="text-center text-info">Users with most answers</h4>
        </div>
        <UserList></UserList>
        <br></br>
        <div>
          <h4 className="text-center text-danger">Hot questions</h4>
        </div>
        <Questions questions={sortedQuestions}></Questions>
      </div>

    </div>
  )
}
export default Home;
