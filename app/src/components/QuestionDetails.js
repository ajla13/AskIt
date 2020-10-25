import React, { useState, useContext, useEffect, Component } from 'react';
import Question from './Question';
import QuestionService from '../services/QuestionService';
import Message from './Message';
import { AuthContext } from '../context/AuthContext';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import LikeButton from './LikeSystem';
import moment from 'moment';
import CommentService from '../services/CommentService'

const QuestionDetails = props => {
    let authorId = props.match.params.authorId;
    let questionId = props.match.params.questionId;
    const[message,setMessage]=useState(null);
    const { isAuthenticated, user } = useContext(AuthContext);
    const [question, setQuestion] = useState({authorName:"",authorLastname:"",date:"",content:"",comments:[],likedBy:[]});
    const[fetched,setFetched]=useState(false);
    
    let state = false;
    if (isAuthenticated) {
        if (user._id == authorId) {
            state = true;
        }
    }

    useEffect(() => {
        let request = {
            authorId,
            questionId
        }
        QuestionService.getQuestion(request).then(data => {
            setQuestion(data);
            setFetched(true);
            
        });
    }, []);

    const searchUser=()=> {
        console.log(question.likedBy);
        for(let i=0;i<question.likedBy.length;i++){
          if(question.likedBy[i]==user._id){
            return true;
          }
        
        }
        return false;
      } 


    const authenticatedDetails = () => {
        return (
            <NewComment question={question} ></NewComment>
        )

    }
    const deletePost = () => {
        document.getElementById("delete").setAttribute("disabled","disabled");
        setMessage({msgBody:"Post deleted!",msgError:true})

        let authorId = props.match.params.authorId;
        let questionId = props.match.params.questionId;
        let request = {
            authorId,
            questionId
        }
        QuestionService.deleteQuestion(request).then(() => {
           props.history.push('/');
        })
    }
    const userQuestion = () => {

        return (
            <button id="delete" type="button" className="btn btn-danger" onClick={deletePost} >Delete</button>
        )

    }
    const Like = () => {
        let likedState=searchUser();
        console.log(likedState);
        console.log(question);
        console.log(user);
        return (
            <LikeButton question={question} user={user} state={likedState}></LikeButton>
        )

    }
      
    const func=()=>{
        if(question.date){
            let date=question.date;
         let temp=moment(date).format('dd-mm-YYYY')
         return(
             
             <span className="float-right">{temp}</span>
         )
        }
       
    }
    
    const commenting=()=>{
        
        return(
           
            <CommentsList question={question}></CommentsList>
        )
    }

    
     return (

         
         <div>
           
             <div>
                 <div>
                 {message ? <Message message={message} /> : null}
                     <div className="card-body">
                         <div className="row">
                             <div className="col-md-2">
                                 <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="img img-rounded img-fluid" />
                                 <p className="text-secondary text-center"></p>
                             </div>
                             <div className="col-md-10">
                                 <div>
                                     <h6 className="float-left" > Posted by <strong>{question.authorName} {question.authorLastname}</strong></h6>
                                     {func()}
 
                                 </div>
                                 <div className="clearfix"></div>
                                 <p>{question.content}</p>
                                 <p>
                                     {isAuthenticated && fetched? Like() : null}
                                    {state ? userQuestion() : null }
                                 </p>
                             </div>
                         </div>
                         <div className="card card-inner">
                             {!isAuthenticated ? null : authenticatedDetails()}
                             {!fetched ? null : 
                                 commenting()
                             }
                             
 
                         </div>
                     </div>
                 </div>
             </div>
 
         </div>
     );
 
}



export default QuestionDetails;