import React from 'react';
import { Link } from 'react-router-dom';
import CommentsList from './CommentsList';
import { useState, useContext, useEffect, Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import QuestionService from '../services/QuestionService'
import LikeButton from './LikeSystem';
import moment from 'moment';
import Message from './Message';
import '../background.css';

const Question = props => {
    const [message,setMessage]=useState(null);
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    
    let state = false;
    let questionId = props.question._id;
    let authorId = props.question.authorId;
    if (user._id == authorId) {
        state = true;
    }

    const deletePost = () => {
    
        setMessage({msgBody:"Post deleted!",msgError:true})
        let request = {
            authorId,
            questionId
        }
        QuestionService.deleteQuestion(request).then(() => {
            window.location.reload();
            
        });
    }
    const userQuestion = () => {

        return (
            <button type="button" className="btn btn-danger float-right" onClick={deletePost} >Delete</button>
        )

    }
    
   const func=()=>{
       if(props.question.date){
           let date=props.question.date;
        let temp=moment(date).format('dd-mm-YYYY')
        return(
            
            <span className="float-right">{temp}</span>
        )
       }
      
   }
    return (
        <div>
            {message ? <Message message={message} /> : null}
            <div>
                <div id="cards"className="card-body">
                    <div className="row">
                        <div className="col-md-2">
                            <img 
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                             className="img img-rounded img-fluid" />
                            <p className="text-secondary text-center"></p>
                        </div>
                        <div className="col-md-10">
                            <div>
                                <h6 className="float-left" > Posted by <strong>{props.question.authorName} {props.question.authorLastname}</strong></h6>
                                {func()}

                            </div>
                            <div className="clearfix"></div>
                            <p>{props.question.content}</p>
                            <div>
                                <Link to={'/' + props.question.authorId + '/' + props.question._id}>
                                    <h6 className="card-link">View question</h6>
                            
                                </Link>
                                <div className="float-right">
                                        {!state ? null : userQuestion()}
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Question;