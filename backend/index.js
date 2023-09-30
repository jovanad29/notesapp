require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const userService = require("./src/services/users.js");
const port = process.env.PORT || 3001;

conn.sync({ force: false }).then(
	async () => {
		server.listen(port, () => {
			console.log(`App listening at ${port}`); // eslint-disable-line no-console
		});
		try {
			const user = await userService.createUser(
				process.env.user,
				process.env.pass
			);
			// console.log("User created: ", user);
		} catch (error) {
			console.log(error);
		}
	},
	(error) => console.log("Error with synchronization", error)
);
