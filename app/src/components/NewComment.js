
import { AuthContext } from '../context/AuthContext';
import CommentService from '../services/CommentService';
import React, {useState,useContext,useEffect, Component} from 'react';

const NewComment=props=>{
    const {user} = useContext(AuthContext);
    const [content,setContent] = useState("");
    let question=props.question;
    let questionId=question._id;
    let authorId=question.authorId;
    let userId=user._id;
    

    const onChange = e =>{
      setContent({...content,[e.target.name] : e.target.value});
      
  }
  const onSubmit =e => {
    e.preventDefault();
    let request={
        content,
        questionId,
        authorId,
        userId
    }
    CommentService.postComment(request).then(data =>{
     window.location.reload();
  });
  }
  

    return(
      <div style={{ padding:10+'px' }}>
          <h5 >Post a new answer</h5>
          <form onSubmit={onSubmit}>
            <div className="form-group"> 
              <label>Your answer: </label>
              <input  type="text"
                  required
                  className="form-control"
                  name="content"
                  onChange={onChange}
                  />
            </div>
            <div className="form-group">
              <input type="submit" value="Post" className="btn btn-primary" />
            </div>
          </form>
          </div>
      )
}
export default  NewComment;
