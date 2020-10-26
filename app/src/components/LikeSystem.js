import React, { useState, useContext, useEffect, Component } from 'react';
import QuestionService from '../services/QuestionService';



const LikeButton = props => {

  const [numberOfLIkes, setLikes] = useState(props.question.likes)
  const [state, setState] = useState({ liked: props.state })
  
  const handleClick = () => {
    
    let request = {
      authorId: props.question.authorId,
      questionId: props.question._id,
      userId: props.user._id,
      liked: !state.liked
    }
    if(!state.liked){
      setLikes(numberOfLIkes+1);
    }
    else{
      setLikes(numberOfLIkes-1);
    }
    QuestionService.questionLiked(request).then(data => {
      
    })
    setState({ liked: !state.liked });
  }


  return (
    <div>
      <button className={state.liked ? 'float-right btn btn-primary' : 'float-right btn text-white btn-danger'}
        onClick={handleClick}>
        <i className={state.liked ? 'fa fa-thumbs-down' : 'fa fa-thumbs-up'}></i>{state.liked ? 'Unlike' : 'Like'}</button>
      <p>Liked by <strong>{numberOfLIkes}</strong></p>
    </div>
  );


}
export default LikeButton;