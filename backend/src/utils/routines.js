const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
};

exports.verifyPassword = async (userPassword, hashedPassword) => {
	try {
		const match = await bcrypt.compare(userPassword, hashedPassword);
		console.log(match);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
