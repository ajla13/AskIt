export default {
    getQuestions : ()=>{
        return fetch('/questions')
                .then(response=>{
                    if(response.status == 200){
                        
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "An error occured",msgError : true}};
                });
    },
    getSortedQuestions : ()=>{
        return fetch('/sortedQuestions')
                .then(response=>{
                    if(response.status == 200){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "An error occured",msgError : true}};
                });
    },

    getQuestion : request =>{
        console.log(request);
        return fetch('/'+request.authorId+'/'+request.questionId)
                .then(response=>{
                    if(response.status == 200){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "An error occured",msgError : true}};
                });
    },

    getUserQuestions : request =>{
        console.log(request);
        return fetch('/myQuestions'+'/'+request).then(response=>{
                    if(response.status == 200){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "An error occured",msgError : true}};
                });
    },

    postQuestion : question=>{
        console.log(question);
        return fetch('/questions',{
            method : "post",
            body : JSON.stringify(question),
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
    questionLiked : request=>{
       
        return fetch('/liked/'+request.authorId+'/'+request.questionId, {
            method : "post",
            body : JSON.stringify(request),
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

    deleteQuestion: request =>{
        console.log(request)
        return fetch('/'+request.authorId+'/'+request.questionId,
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
    }
}