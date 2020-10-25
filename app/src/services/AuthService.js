export default {
    login : user =>{
        console.log(user);
        return fetch('/login',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated : false, 
                    user : {email : "",password:"",name:"",surname:"",_id:""},message:{
                    msgBody:"Log in failed",msgError:true
                }};
        })
    },
    register : user =>{
        console.log(user);
        return fetch('/register',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    logout : ()=>{
        return fetch('/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated : ()=>{
        return fetch('/authenticated')
                .then(res=>{
                    if(res.status !== 401)
                        return res.json().then(data => data);
                    else
                        return { isAuthenticated : false, user : {email : "",name : "",surname:"",_id:""}};
                });
    },

    
        getUsers : ()=>{
            return fetch('/users')
                    .then(response=>{
                        
                        if(response.status == 200){
                           
                            return response.json().then(data => data);
                            
                        }
                        else
                        console.log("get users error");
                            return {message : {msgBody : "An error occured",msgError : true}};
                           
                    });
        },
        getUserById : request=>{
            return fetch('/user/'+request.userId)
                    .then(response=>{
                        
                        if(response.status == 200){
                            console.log(response);
                            return response.json().then(data => data);
                            
                        }
                        else
                        console.log("get users error");
                            return {message : {msgBody : "An error occured",msgError : true}};
                           
                    });
        },
        updateUser : request=>{
            return fetch('/update/'+request.userId,{
                method : "post",
                body : JSON.stringify(request),
                headers:{
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                return response.json().then(data => data);
                
            });
        },
        updatePass : request=>{
            
            return fetch('/changePassword/'+request.userId,{
                method : "post",
                body : JSON.stringify(request),
                headers:{
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                return response.json().then(data => data);
            });
        },
        popNotifications : request=>{
         
            return fetch('/notification/'+request.userId,{
                method : "delete",
                body : JSON.stringify(request),
                headers:{
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                return response.json().then(data => data);
            });
        }



}