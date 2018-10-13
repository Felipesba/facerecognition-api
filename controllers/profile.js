const handleProfileGet = (req, res, db) => {
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

}

module.exports = {
	handleProfileGet
};