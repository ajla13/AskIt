const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');

require('dotenv').config();

var app = express();

const port=process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/index');



app.use('/', usersRouter);
app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.listen(port, ()=>
{
    console.log(`Server is running on port: ${port}`)
});