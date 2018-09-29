const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'HOME',
    password : '',
    database : 'smart-brain'
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



app.listen(3000, () => {
	console.log("Is running on port 3000");
})

//EndPoint = root /
app.get('/', (req, res) => {
	res.json(database.users);
})

//EndPoint = signin 
app.post('/signin', (req,res) => {
	db.select('email', 'hash').from('login')
	.where('email', '=', req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		if(isValid){
			return(db.select('*').from('users'))
				.where('email', '=', req.body.email)
				.then(user => res.json(user[0]))
				.catch(err => res.status(400).json('Unable to get user'))
		} else {
			res.status(400).json('Wrong Credential')
		}	
	})
	.catch(err => res.status(400).json('Wrong Credential'))
		
})


//Register = registro do usuario 
app.post('/register', (req,res) => {
	const {name, email, password} = req.body;
	const hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date()
					})
					.then(user => res.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to register'))
})
	

// /profile/:userId --> get = user
app.post('/profile/:id', (req,res) => {
	const {id} = req.params;
	
	db.select('*').from('users').where({id})
	
	.then(users => {
		// console.log(users[0]);
		if (users.length) {
			res.json(users[0])
		} 
			else {
			res.status(404).json('Id inexistente...');
				}
	})
	.catch(err => res.status(404).json('User not register'))	

})

//image --> put --> user count 
app.put('/image', (req,res) => {
	const {id} = req.body;

	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))		
		.catch(err => res.status(400).json('Unable to Get Entries'))
})




/*
Endpoints
/ --> resp = working
/signin --> post = sucess/failure
/register --> post =  user object
/profile/:userId --> get = user
/image --> put --> user count 
*/