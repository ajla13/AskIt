import React, { useState, useContext, useEffect } from 'react';
import Message from './Message';
import Comment from './Comment';



const CommentsList = props => {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState({ mesgBody: "Loading...", msgError: false });
    useEffect(() => {
        if (props.question.comments.length <= 0) {
            setMessage({ msgBody: "No answers to this post", msgError: false })
        }
        else {
            setMessage(null);
        }

        setComments(props.question.comments)
    }, []);


    return (
        <div style={{ padding: 10 + 'px' }}>

            <h3>Answers</h3>
            <ul>
                {
                    comments.map(comment => {
                        return <Comment key={comment._id} comment={comment} question={props.question} />
                    })
                }
            </ul>
            {message ? <Message message={message} /> : null}
        </div>
    );


}

export default CommentsList;