const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId,
		auto: true
	},
	authorName: {
		type: String,
		required: true
    },
    authorLastname: {
		type: String,
		required: true
    },
    authorId:{
        type:mongoose.Schema.ObjectId
    },
	content: {
        type: String,
        required: true
    },
	date: {
		type: Date,
		"default": new Date()
	},
});

const questionSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.ObjectId,
		auto: true
	},
	authorName: {
		type: String,
		required: true
    },
    authorLastname: {
		type: String,
		required: true
    },
    authorId: {
        type: mongoose.Schema.ObjectId
    },
	content: {
        type: String,
        required: true
    },
	date: {
        type: Date,
        
		
    },
    likes: {
        type: Number,
        default:0
    },
    dislikes: {
        type: Number,
        default:0
    },
    likedBy:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    },
	comments: [commentSchema]
},
{
    timestamps: true,
  });
const userSchema = new Schema({
  _id: {
		type: mongoose.Schema.ObjectId,
		auto: true
	},
	email: {
		type: String
	},
    name: {
	type: String
  },
  surname: {
	type:String
  },
  password: {
	  type: String
  },
  questions: [questionSchema],
  answers : {
      type: Number,
      default:0
  },
  notifications:{
      type:[],
      default:[]
  }
}, {
  timestamps: true,
});

userSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

 userSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        console.log(password);
        console.log(this.password);
        console.log(isMatch);
        if(err){
            return cb(err);
        }
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    });
}


const User = mongoose.model('User', userSchema);

module.exports = User;