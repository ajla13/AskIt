import React,{useEffect, useState}from 'react';
import Question from './Question';
import Message from './Message';


const Questions = props =>{
    const[message,setMessage]=useState({msgBody:"Loading...",msgError:false});
    const [questions,setQuestions]=useState([]);
    
    useEffect(()=>{
        if(!props.questions.length){
            setTimeout(()=>{
                setMessage({msgBody:"No posts to show",msgError:false});
            },2000)
               
           }
           else{
            setMessage(null);
        }
       setQuestions(props.questions);
       
       
    })
   

    return(
        <div>
           
            <ul className="list-group">
                {
                    questions.map(question =>{
                        return <Question key={question._id} question={question} />
                    })
                }
            </ul>
            {message ? <Message message={message}/> : null}
        </div>
    );

}

export default Questions;