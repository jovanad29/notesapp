const { User } = require("../db");
const { hashPassword, verifyPassword } = require("../utils/routines");

exports.createUser = async (username, password) => {
	try {
		const userExists = await User.findOne({
			where: { username: username },
		});
		if (userExists) {
			throw {
				statusCode: 400,
				statusText: "Username already exists",
			};
		}

		const user = await User.create({
			username: username,
			password: await hashPassword(password),
		});

		return user;
	} catch (error) {
		throw error;
	}
};

exports.verifyUser = async (username, password) => {
	try {
		const user = await User.findOne({ where: { username: username } });
		if (user && (await verifyPassword(password, user.password))) {
			return user;
		}
		throw {
			statusCode: 401,
			statusText: "Invalid credentials",
		};
	} catch (error) {
		throw error;
	}
};
