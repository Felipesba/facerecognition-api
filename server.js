const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  	ssl: true,
  }
});

// db.select().table('users').then(data => {
// 	console.log(data);
// });



const app = express();
app.use(bodyParser.json());
app.use(cors());


const	database = {
	users: [
	{
		id: "123",
		name: "John",
		email: 'john@gmail.com',
		password: "123",
		entries: 0 ,
		joined: new Date()
	},

	{
		id: "09",
		name: "Yanger",
		email: 'yan@gmail.com',
		password: "123",
		entries: 0 ,
		joined: new Date()
	}
	]
}



app.listen(process.env.PORT || 3000, () => {
	console.log("Is running on port ${process.env.PORT}");
})

//EndPoint = root /
app.get('/', (req, res) => {res.json("IT`s WORKING")})

//EndPoint = signin 
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})


//Register = registro do usuario 
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
	

// /profile/:userId --> get = user
app.post('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db)})


//image --> put --> user count 
app.put('/image', (req,res) => { image.handleImage(req, res, db)})

//imageurl --> endpoint para a chamada da API Clarifai
app.post('/imageurl', (req,res) => { image.handleApiCall(req, res)})


/*
Endpoints
/ --> resp = working
/signin --> post = sucess/failure
/register --> post =  user object
/profile/:userId --> get = user
/image --> put --> user count 
*/