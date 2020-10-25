export default {
    postComment : comment=>{
    console.log(comment);
    return fetch('/'+comment.authorId+'/'+comment.questionId, {
        method : "post",
        body : JSON.stringify(comment),
        headers:{
            'Content-Type' : 'application/json'
        }
    }).then(response=>{
        if(response.status !== 401){
            return response.json().then(data => data);
        }
        else
            return {message : {msgBody : "UnAuthorized"},msgError : true};
    });
},

getComments : parameters =>{
    console.log(parameters);
    return fetch('/'+parameters.authorId+'/'+parameters.questionId)
            .then(response=>{
                if(response.status === 200){
                    return response.json().then(data => data);
                }
                else
                    return {message : {msgBody : "An error occured",msgError : true}};
            });
},

deleteComment: request =>{
    console.log(request)
    return fetch('/'+request.authorId+'/'+request.questionId+'/'+request.commentId,
    {
        method : "delete",
        headers:{
            'Content-Type' : 'application/json'
        }
        }).then(response=>{
        if(response.status !== 401){
            return {message : {msgBody : "Success"},msgError : false};
        }
        else
            return {message : {msgBody : "UnAuthorized"},msgError : true};
    });
},
updateComment: request =>{
    console.log(request)
    return fetch('/'+request.authorId+'/'+request.questionId+'/'+request.commentId,
    {
        method : "post",
        body : JSON.stringify(request),
        headers:{
            'Content-Type' : 'application/json'
        }
        }).then(response=>{
        if(response.status ==200){
            return response.json().then(data => data);
        }
        else
            return {message : {msgBody : "UnAuthorized"},msgError : true};
    });
}
}

