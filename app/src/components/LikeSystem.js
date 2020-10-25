import React, {useState,useContext,useEffect, Component} from 'react';
import QuestionService from '../services/QuestionService';

    

const LikeButton=props=>{

 
  const[state,setState]=useState({liked:props.state})
  console.log(props);
  const handleClick=()=> {
   // console.log(state.liked);
      let request={
        authorId:props.question.authorId,
        questionId:props.question._id,
        userId:props.user._id,
        liked:!state.liked
      }
      console.log(request);
        QuestionService.questionLiked(request).then(data=>{
             console.log(data);
        })
        setState({liked:!state.liked});
  }

  
    return (
      <div>
        <button className={state.liked? 'float-right btn btn-primary':'float-right btn text-white btn-danger'} 
        onClick={handleClick}>
        <i className={state.liked? 'fa fa-thumbs-down':'fa fa-thumbs-up'}></i>{state.liked ? 'Unlike' : 'Like'}</button>
      </div>
    );
  

}
export default LikeButton;