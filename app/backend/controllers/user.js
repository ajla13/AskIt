const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const passportConfig = require('../../passport');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userById = (req, res) => {
	User.findById(req.params.idUser).exec((error, user) => {
		if (!user) {
			return res.status(404).json({
				"message": "No user with this id."
			});
		} else if (error) {
			return res.status(500).json(error);
		}
		res.status(200).json(user);
	});
};

const updateUser = (req, res) => {
    User
        .findById(req.params.idUser)
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json(
                    {message : {msgBody : "Unauthorized, user not found", msgError: true}});
            } else if (error) {
                return res.status(500).json(
                    {message : {msgBody : "A problem occured,please try again", msgError: true}}
                );
            }
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.email = req.body.email;

            user.save((error, user) => {
                if (error) {
                    res.status(404).json({message : {msgBody : "A problem occured,please try again", msgError: true}});
                } else {
                    res.status(200).json({message : {msgBody : "Information updated", msgError: false}});
                }
            });
        });
	
};
const Users = (req, res) => {
    console.log("here in backend");
	User.find().exec(function (error, users) {
		if (error) {
			console.log(error);
			res.status(500).json({
				"message": "Query error"
			});
		} else {
			res.status(200).json(users);
		}
	});
};
const allUsers = (req, res) => {
    console.log("here in backend");
	User.find().exec(function (error, users) {
		if (error) {
			console.log(error);
			res.status(500).json({
				"message": "Query error"
			});
		} else {
            console.log(users);
            users=sortUsers(users)
			res.status(200).json(users);
		}
	});
};
function sortUsers(arr){
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
      for(var j = 1; j<=i; j++){
        if(arr[j-1].answers<arr[j].answers){
            var temp = arr[j-1];
            arr[j-1] = arr[j];
            arr[j] = temp;
         }
      }
    }
    var array=arr.slice(0,2);
    return array;
 }

const register = (req, res) => {
   
    User.findOne({email: req.body.email}).exec((error, user) => {
        if (!user) {
            User.create({
                password: req.body.password,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email
            }, (error_create, user_create) => {
                if(error_create) {
                    res.status(400).json(error_create);
                } else {
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}})
                }
            })
        } else if (error) {
            return res.status(500).json(error);
        }
        else {
            res.status(409).json({"message" : "email already exists"});
        }
    });
};

const login = (req, res) => {
    passport.authenticate('local', (error, user, info) => {
        if (error)
            return res.status(500).json(error);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};


const deleteUser = (req, res) => {
    const username=req.body.username;
    if(username){
        User.findOneAndDelete(username)
        .exec((error) =>{
            if (error) {
                return res.status(500).json(error);
            }
            res.status(204).json(null);
        });
    }
    else{
        res.status(404).json({
            "message":
                "Cant find user."
        });
    }
};

const changePass=(req,res)=>{
    console.log(req.body);
    console.log("in change pass");
    User
        .findById(req.params.idUser)
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({"message": "No user"});
            } else if (error) {
                return res.status(500).json(error);
            }
            console.log(user.name)
            let currentPass = req.body.pass;
                    bcrypt.compare(currentPass,user.password,(err,isMatch)=>{
                            if(err){
                            res.status(404).json({
                                "message":
                                    "An error occured"
                            });
                        }
                        else{
                            if(isMatch){
                                
                                 if(req.body.newPass==req.body.repeat){
                                            user.password=req.body.newPass;
                                            console.log(req.body.newPass);
                                            console.log(user.password)
                                                user.save((error, user) => {
                                                    if (error) {
                                                        res.status(404).json(error);
                                                    } else {
                                                        res.status(200).json(
                                                            {message : {msgBody : "Password changed!", msgError: false}});
                                                    }
                                                });
                                            }
                                            else{
                                                res.status(404).json(
                                                    {message : {msgBody : "New password and repeated password do not match!", msgError: true}}
                                                );
                                            }
                                        }
                                        else{
                                            res.status(400).json({message : {msgBody : "Incorrect password!", msgError: true}});
                                        }
                                     }
                     } )
                                    
                                 })
                            }
                  

    
module.exports = {
    allUsers,
    register,
    login,
    deleteUser,
    userById,
    updateUser,
    changePass,
    Users
}
