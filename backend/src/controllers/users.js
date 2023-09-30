const userService = require("../services/users");

exports.createUser = async (req, res) => {
	const { username, password } = req.body;
	if ((!username, !password)) {
		return res.status(400).json({
			statusCode: 400,
			statusText: "All fields are required",
		});
	}
	try {
		const user = await userService.createUser(username, password);

		return res.status(201).json({
			statusCode: 201,
			statusText: "User registered successfuly",
			result: user,
		});
	} catch (error) {
		console.log(error);
		if (error.statusCode) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				statusText: error.statusText,
			});
		}
		return res.status(400).json({
			statusCode: 400,
			statusText: "Error",
		});
	}
};

exports.verifyUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await userService.verifyUser(username, password);
		return res.status(200).json({
			statusCode: 200,
			statusText: "User validated",
			result: user.id,
		});
	} catch (error) {
		console.log(error);
		if (error.statusCode) {
			return res.status(error.statusCode).json({
				statusCode: error.statusCode,
				statusText: error.statusText,
			});
		}
		return res.status(400).json({
			statusCode: 400,
			statusText: "Error",
		});
	}
};
