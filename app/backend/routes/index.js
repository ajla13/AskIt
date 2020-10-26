const router = require('express').Router();
let User = require('../models/user.model');
const passport = require('passport');
const passportConfig = require('../../passport');
const JWT = require('jsonwebtoken');

const signToken = userID =>{
    return JWT.sign({
        iss : "AppAsk",
        sub : userID
    },"AppAsk",{expiresIn : "1h"});
}

router.post('/login',passport.authenticate('local',{session : false}),
     (req,res)=>{
       if(req.isAuthenticated()){
        
       const name=req.user.name;
       const email=req.user.email;
       const surname=req.user.surname;
       const _id = req.user._id;
       const notifications=req.user.notifications;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true,
        user : {email,name,surname,_id,notifications}, message:{msgBody:"Succesfully logged in"},msgError:false});
       }
       else{
        res.status(401).json({isAuthenticated : false,
            user : {email:"",name:"",surname:"",_id:"",notifications:[]},
             message:{msgBody:"Unauthorized"},msgError:true});
       }
});
router.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{email : "", name : "", surname: "",notifications:[]},success : true});
});

router.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const name=req.user.name;
       const email=req.user.email;
       const surname=req.user.surname;
       const _id = req.user._id;
       const notifications=req.user.notifications;
    res.status(200).json({isAuthenticated : true, user : {email,name,surname,_id,notifications}});
});
var ctrlUsers = require('../controllers/user');
var ctrlQuestions= require('../controllers/questions');

router.delete('notification/:userId',ctrlQuestions.popNotifications);
router.post('/changePassword/:idUser',ctrlUsers.changePass);
router.get('/usersAll',ctrlUsers.Users);
router.post('/update/:idUser',ctrlUsers.updateUser);
router.get('/user/:idUser',ctrlUsers.userById);
router.get('/users', ctrlUsers.allUsers);
router.post('/register', ctrlUsers.register);
router.post('/liked/:authorId/:questionId',ctrlQuestions.questionLiked);
router.get('/sortedQuestions',ctrlQuestions.questionLikes);
router.get('/myQuestions/:userId',ctrlQuestions.userQuestions);
router.get('/:authorId/:questionId', ctrlQuestions.questionByID);
router.get('/questions', ctrlQuestions.allQuestions);
router.post('/questions',ctrlQuestions.createQuestion);
router.post('/:authorId/:questionId',ctrlQuestions.createComment);
router.delete('/:authorId/:questionId',ctrlQuestions.deletePost);
router.delete('/:authorId/:questionId/:commentId',ctrlQuestions.deleteComment);
router.post('/:authorId/:questionId/:commentId',ctrlQuestions.updateComment);

module.exports = router;