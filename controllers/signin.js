const handleSignin = (req,res, db, bcrypt) => {
	const { email, password }= req.body;

	if (!email || !password) {
		return res.status(400).json('Failed to SignIn');
	}

	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		if(isValid){
			return(db.select('*').from('users'))
				.where('email', '=', email)
				.then(user => res.json(user[0]))
				.catch(err => res.status(400).json('Unable to get user'))
		} else {
			res.status(400).json('Wrong Credential')
		}	
	})
	.catch(err => res.status(400).json('Wrong Credential'))
		
}

module.exports = {
	handleSignin: handleSignin
};