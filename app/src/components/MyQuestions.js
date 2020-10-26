import React, { useState, useContext, useEffect } from 'react';
import Question from './Question';
import QuestionService from '../services/QuestionService';
import Message from './Message';
import { AuthContext } from '../context/AuthContext';
import '../background.css';
let arrayForHoldingPosts;
const postsPerPage = 20;

const useConstructor = (callBack = () => { }) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}


const MyQuestions = props => {
    const { user } = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);
    const [message, setMessage] = useState(null);
    const [postsToShow, setPostsToShow] = useState([]);
    const[next,setNext]=useState(20);

    useConstructor(() => {
      arrayForHoldingPosts=[];
        let userId = user._id;
        QuestionService.getUserQuestions(userId).then(data => {
            loopWithSlice(0, postsPerPage,data);
            setQuestions(data);
            if(data.length==0){
                setMessage({msgBody : "You have not posted any questions yet", msgError:false})
            }
        })
    });

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
            <button  style={{margin:30+"px"}} className="btn btn-primary" onClick={handleShowMorePosts}>Load more</button>
          )
        }
    }
      }
    
    



    return (
        <div >
            <ul className="list-group">
                {

                    postsToShow.map(question => {
                        return <Question key={question._id} question={question} />
                    })

                }
            </ul>
            {loadButton()}
            {message ? <Message message={message} /> : null}
        </div>
    );

}

export default MyQuestions;