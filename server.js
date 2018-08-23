const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

const	database = {
	users: [
	{
		id: "123",
		name: "John",
		email: 'john@gmail.com',
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
	if (req.body.name === database.users[0].name &&
		req.body.password === database.users[0].password) 
	{
		res.json('SUCESS>>>>>>.......');
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
		"password": password
	});
	res.json(database.users[database.users.length-1]);
})



/*
Endpoints
/ --> resp = working
/signin --> post = sucess/failure
/register --> post =  user object
/profile/:userId --> get = user
/image --> put --> user count 
*/

