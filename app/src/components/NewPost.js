import { AuthContext } from '../context/AuthContext';
import QuestionService from '../services/QuestionService';
import React, {useState,useContext,useEffect, Component} from 'react';

const NewPost=props=>{
    const { isAuthenticated, user } = useContext(AuthContext);
    const [content, setContent] = useState({ content: "", email: user.email });
    

    const onChange = e =>{
      setContent({...content,[e.target.name] : e.target.value});
      
  }
  const resetForm = () => {
    document.getElementById("formQuestion").reset();
  }
  const onSubmit = e => {
    e.preventDefault();
    QuestionService.postQuestion(content).then(data => {
     
      resetForm();
      props.history.push('/');
    });
   
  }
  

    return(
        <form onSubmit={onSubmit} id="formQuestion">
        <div className="form-group">
          <label>Question: </label>
          <input type="text"
            required
            className="form-control"
            name="content"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Ask" className="btn btn-primary" />
        </div>
      </form>
      )
}
export default  NewPost;
