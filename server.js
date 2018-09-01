const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


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



app.listen(3000, () => {
	console.log("Is running on port 3000");
})

//EndPoint = root /
app.get('/', (req, res) => {
	res.json(database.users);
})

//EndPoint = signin 
app.post('/signin', (req,res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) 
	{
		res.json('SUCESS>>>>>>');
	} else {
		res.status(400).json('FAILED...');
	}
})


//Register = registro do usuario 
app.post('/register', (req,res) => {
	const {name, email, password} = req.body;
	database.users.push(
	{
		"name": name,
		"email": email,
		"entries": 0,
		"joined": new Date()
	});
	res.json(database.users[database.users.length-1]);
})

// /profile/:userId --> get = user
app.post('/profile/:id', (req,res) => {
	const {id} = req.params;
	let found = false;

	database.users.forEach(users => {
		if (users.id === id) {
			found = true;
			return res.json(users);
		}
		})
		 if (!found) {
		 	res.status(404).json('Id inexistente...');
		 }
	})

//image --> put --> user count 
app.put('/image', (req,res) => {
	const {id} = req.body;
	let found = false;

	database.users.forEach(users => {
		if (users.id === id) {
			found = true;
			users.entries++;
			return res.json(users.entries);
			}
		})
		 if (!found) {
		 	res.status(404).json('Id inexistente...');
		 }
	})




/*
Endpoints
/ --> resp = working
/signin --> post = sucess/failure
/register --> post =  user object
/profile/:userId --> get = user
/image --> put --> user count 
*/