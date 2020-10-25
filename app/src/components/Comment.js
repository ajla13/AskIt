import React, { useState, useContext, useEffect, Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import CommentService from '../services/CommentService';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter'

const Comment = props => {
    const { isAuthenticated, user } = useContext(AuthContext);
    let state = false;
    let questionId = props.question._id;
    let authorId = props.question.authorId;
    let commentId = props.comment._id;
    let commentAuthor = props.comment.authorId
    const [show, setShow] = useState(false);
    //const [content, setContent] = useState(props.comment.content);
    const [editing,setEditing]=useState({text:"Edit",btnClicked:false,temp:"",content:props.comment.content});
    const[temperory,setTemperory]=useState("")


    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleClick=()=>{

        if(editing.text=="Update"){
            let request={
                authorId:authorId,
                questionId:questionId,
                commentId:commentId,
                content:temperory.temperory
            }
            
            CommentService.updateComment(request).then(data=>{
                console.log(data);
                setEditing({text:"Edit",btnClicked:false,temp:"",content:data.content});
            })
        }
        else{
        setEditing({text:"Update",btnClicked:true,temp:"",content:props.comment.content});
        }
        
    }

    const onChange = e => {
        setTemperory({...temperory,[e.target.name] : e.target.value});
        console.log(temperory);

    }

    if (isAuthenticated) {
        if (user._id == commentAuthor) {
            state = true;
        }
    }
    const deleteComment = () => {
        let request = {
            authorId,
            questionId,
            commentId
        }
        CommentService.deleteComment(request).then(() => {
            window.location.reload();
        });
    }
    const cancelBtn=()=>{
        return(
            <button type="button" style={{margin:'5px'}}className="btn btn-secondary float-right">Cancel</button>
   )
    }
    
    const userComment = () => {

        return (
            <>
                 <br></br><br></br><br></br>
                <button type="button" 
                style={{margin:'5px'}} className="btn btn-danger float-right" onClick={deleteComment} >Delete</button>
                <button type="button" style={{margin:'5px'}}className="btn btn-primary float-right" onClick={handleClick}>
                    {editing.text}</button>
                {editing.btnClicked ? cancelBtn(): null}
                
                
            </>

        )

    }

   const editingComment=()=>{
       return(
           <>
           <input  type="text"
                  required
                  className="form-control"
                  name="temperory"
                  placeholder={editing.content}
                  onChange={onChange}
                  />
           </>
       )
   }
   const staticComment =()=>{
    return(
        <p>{editing.content}</p>
    )
   }
    return (
        <div>

            <div className="card-body">
                <div className="row">
                    <div className="col-md-2">
                        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                        <p className="text-secondary text-center">{props.comment.date}</p>
                    </div>
                    <div className="col-md-10">
                        <h6>Posted by <strong>{props.comment.authorName} {props.comment.authorLastname}</strong></h6>
                        {editing.btnClicked ? editingComment() : staticComment()}
                        <div>
                            <div className="float-left">
                                {!state ? null : userComment()}
                            </div>
                           
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}



export default Comment;