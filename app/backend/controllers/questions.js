const mongoose = require('mongoose');
const User = mongoose.model('User');

const allQuestions = (req, res) => {
    User.find({}, {
        _id: true,
        "questions": true,
    }).exec(function (error, users) {
        if (error) {
            (error);
            res.status(500).json({
                "message": "Query error"
            });
        } else {
            let q=unnested(users);
            (q);
            res.status(200).json(q);
        }
    })
};



function unnested(users) {
    let questions_list = [];
    for (let i = 0; i < users.length; i++) {
        var questionsByUser = users[i].questions;
        for (let j = 0; j < questionsByUser.length; j++) {
            questions_list.push(questionsByUser[j]);
        }
    }
    return sortByDate(questions_list);
}


function sortByDate(arr){
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(arr[j-1]._id.getTimestamp()<arr[j]._id.getTimestamp()){
            var temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
         }
      }
    }
   
    return arr;
 }
const popNotifications=(req,res)=>{
    User
        .findById(req.params.userId)
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({
                    "message": "There is no user with this id."
                });
            } else if (error) {
                return res.status(500).json(error);
            }
             else {
                    user.notifications=[];
                    user.save((error, user) => {
                        if (error) {
                            res.status(400).json(error);
                        } else {
                          
                            res.status(204).json();
                        }
                    });
                   
                }
            
        });
}
const userQuestions =(req,res)=>{
    
    User
        .findById(req.params.userId)
        .select("questions")
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({
                    "message": "There is no user with this id."
                });
            } else if (error) {
                return res.status(500).json(error);
            }
            if (user.questions && user.questions.length >= 0) {
                
                res.status(200).json(user.questions.reverse());
                
                } else {
                    return res.status(404).json({
                        "message": "Cannot find any questions."
                    });
                }
            
        });
}

const addQuestion = (req, res, user) => {
    if (!user) {
        res.status(404).json({
            "message": "Cannot find user."
        });
    } else {
       
        let dateForStorage=new Date();
        let temp=dateForStorage.toDateString();
        
       
        user.questions.push({
            authorName: user.name,
            authorLastname: user.surname,
            authorId: user._id,
            content: req.body.content,
            date: temp
        });
        
        user.save((error, user) => {
            if (error) {
                res.status(400).json(error);
            } else {
                const question = user.questions.slice(-1).pop();
                
                
                res.status(201).json(question);
            }
        });
    }
};

const createQuestion = (req, res) => {
    if (req.body.email) {
        User.findOne({email : req.body.email})
            .exec((error, user) => {
                if (error) {
                    res.status(400).json({"message":
                     "Stuck."});
                } else {
                    addQuestion(req, res, user);
                }
            });
    } else {
        res.status(400).json({
            "message": "Cannot find user."
        });
    }
};

const questionByID = (req, res) => {
    User
        .findById(req.params.authorId)
        .select("questions")
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({
                    "message": "There is no user with this id."
                });
            } else if (error) {
                return res.status(500).json(error);
            }
            if (user.questions && user.questions.length > 0) {
                const question = user.questions.id(req.params.questionId);
                if (!question) {
                    return res.status(404).json({
                        "message": "There is no question with this id."
                    });
                } else {
                    res.status(200).json(question)
                }
            } else {
                return res.status(404).json({
                    "message": "Cannot find any questions."
                });
            }
        });
};

const createComment = (req, res) => {
   
    let question=null;
    let authorOfComment=null;
    if(req.body.userId){
        User.findById(req.body.userId).exec((error, user) => {
            if (!user) {
                 return res.status(404).json({
                         "message": "There is no user with this id."
                        });
                } else if (error) {
                        return res.status(500).json(error);
                }else{
                    authorOfComment=user;
                    
                     user.answers=user.answers+1;
                   
                     user.save((error, user) => {
                        if (error) {
    
                            res.status(400).json(error);
                        } else {
                            
                        }
                    });
                    }
                }); 
            } 
           
    if (req.body.content && req.body.authorId && req.body.questionId) {
        User
        .findById(req.body.authorId)
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({
                    "message": "There is no user with this id."
                });
            } else if (error) {
                return res.status(500).json(error);
            }
            if (user.questions && user.questions.length > 0) {
                const questionPrime = user.questions.id(req.body.questionId);
                if (!questionPrime) {
                    return res.status(404).json({
                        "message": "There is no question with this id."
                    });
                } else {
                    question=questionPrime;
                
                    if(question){
                       
                        question.comments.push({
                            authorName: authorOfComment.name,
                            authorLastname: authorOfComment.surname,
                            authorId: authorOfComment._id,
                            content: req.body.content.content
                        });
                        const comment=question.comments.slice(-1).pop(); 
                       
                        user.notifications.push({commentedBy:authorOfComment.name,id:question._id});                           
                       
                       user.save((error,user) => {
                            if (error) {
                                res.status(400).json(error);
                            } else {
                                
                                
                                res.status(201).json(comment);
                            
                            }
                        });
                    }      
                    else {
                        res.status(400).json({
                            "message": "Cannot find question."
                        });
                    }
                }
            } else {
                return res.status(404).json({
                    "message": "Cannot find any questions."
                });
            }
        });
         } 
    else{
        res.status(400).json({
            "message": "Missing parameters."
        });
    }    
    
};

const getComments = (req, res) =>{
         

    if (req.body.authorId && req.body.questionId) {
        User
        .findById(req.body.authorId)
        .select("questions")
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({
                    "message": "There is no user with this id."
                });
            } else if (error) {
                return res.status(500).json(error);
            }
            if (user.questions && user.questions.length > 0) {
                const questionPrime = user.questions.id(req.body.questionId);
                if (!questionPrime) {
                    return res.status(404).json({
                        "message": "There is no question with this id."
                    });
                } else {
                    return res.status(200).json(questionPrime.comments)
                    
                }
            } else {
                return res.status(404).json({
                    "message": "Cannot find any questions."
                });
            }
              
});
    }
else{
    res.status(400).json({
        "message": "Missing parameters."
    });
}  
};

const deletePost = (req, res) => {
   
    User
    .findById(req.params.authorId)
    .select("questions")
    .exec((error, user) => {
        if (!user) {
            return res.status(404).json({
                "message": "There is no user with this id."
            });
        } else if (error) {
            return res.status(500).json(error);
        }
        if (user.questions && user.questions.length > 0) {
            
            user.questions.id(req.params.questionId).remove();
            user.questions.pull(req.params.questionId);

                    user.save((error) => {
                        if (error) {
                            return res.status(500).json(error);
                        } else {
                            res.status(204).json(user);
                        }
                    });
            }
         else {
            return res.status(404).json({
                "message": "Cannot find any questions."
            });
        }

    });
};

const deleteComment=(req,res)=>{
    
    User
    .findById(req.params.authorId)
    .exec((error, user) => {
        if (!user) {
            
            return res.status(404).json({
                "message": "There is no user with this id."
            });
        } else if (error) {
            return res.status(500).json(error);
        }
        (user);
        if (user.questions && user.questions.length > 0) {
            
            const question = user.questions.id(req.params.questionId);
            (question);
            if (!question) {
                return res.status(404).json({
                    "message": "There is no question with this id."
                });
            } else {
                let comm=question.comments.id(req.params.commentId);
                User.findById(comm.authorId).exec((error, author) => {
                    if (!author) {
                        return res.status(404).json({
                            "message": "No user with this id."
                        });
                    } else if (error) {
                        return res.status(500).json(error);
                    }
                    author.answers=author.answers-1;
                    author.save((error) => {
                        if (error) {
                            return res.status(500).json(error);
                        } else {
                            (author);
                        }
                    });
                });
                
                
                question.comments.id(req.params.commentId).remove();
                

                user.save((error) => {
                    if (error) {
                        return res.status(500).json(error);
                    } else {
                        res.status(204).json(user);
                    }
                });
            }
        } else {
            return res.status(404).json({
                "message": "Cannot find any questions."
            });
        }
    });
}
const updateComment=(req,res)=>{
    
    User
    .findById(req.params.authorId)
    .select("questions")
    .exec((error, user) => {
        if (!user) {
            return res.status(404).json({
                "message": "There is no user with this id."
            });
        } else if (error) {
            return res.status(500).json(error);
        }
        if (user.questions && user.questions.length > 0) {
            const question = user.questions.id(req.params.questionId);
            if (!question) {
                return res.status(404).json({
                    "message": "There is no question with this id."
                });
            } else {
              
               question.comments.id(req.params.commentId).content=req.body.content;
    
                user.save((error) => {
                    if (error) {
                        
                        return res.status(500).json(error);
                    } else {
                        res.status(200).json(question.comments.id(req.params.commentId));
                    }
                });
            }
        } else {
            return res.status(404).json({
                "message": "Cannot find any questions."
            });
        }
    });
}

questionLikes=(req,res)=>{
    User.find({}, {
        _id: true,
        "questions": true,
    }).exec(function (error, users) {
        if (error) {
            (error);
            res.status(500).json({
                "message": "Query error"
            });
        } else {
            let question_list=unnested(users)
            let result=sortQuestions(question_list)
            res.status(200).json(result);
        }
    })
}

function sortQuestions(arr){
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(arr[j-1].likes<arr[j].likes){
            var temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
         }
      }
    }
    var array=arr.slice(0,2);
    return array;
 }

const questionLiked=(req,res)=>{
    User
    .findById(req.params.authorId)
    .select("questions")
    .exec((error, user) => {
        if (!user) {
            return res.status(404).json({
                "message": "There is no user with this id."
            });
        } else if (error) {
            return res.status(500).json(error);
        }
        if (user.questions && user.questions.length > 0) {
            const question = user.questions.id(req.params.questionId);
            if (!question) {
                return res.status(404).json({
                    "message": "There is no question with this id."
                });
            } else {
                (req.body.liked);
                if(req.body.liked){
                    question.likes=question.likes+1;
                    question.likedBy.push(req.body.userId);
                }else{
                    ("in unliking");
                    question.likes=question.likes-1;
                    question.likedBy.remove(req.body.userId);
                }
                
                user.save((error) => {
                    if (error) {
                        
                        return res.status(500).json(error);
                    } else {
                        res.status(200).json(question);
                    }
                });
                
            }
        } else {
            return res.status(404).json({
                "message": "Cannot find any questions."
            });
        }
    });
}

module.exports = {
    allQuestions,
    createQuestion,
    questionByID,
    createComment,
    getComments,
    userQuestions,
    deletePost,
    deleteComment,
    questionLikes,
    updateComment,
    questionLiked,
    popNotifications
}