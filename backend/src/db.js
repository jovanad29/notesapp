require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
	{
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
		port: DB_PORT,
		define: {
			freezeTableName: true, // keeps the model's original name
		},
	}
);
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Note, Category } = sequelize.models;

User.hasMany(Category, {
	foreignKey: "userId",
});
Category.belongsTo(User, {
	as: "user",
	foreignKey: "userId",
});
User.hasMany(Note, {
	foreignKey: "userId",
});
Note.belongsTo(User, {
	as: "user",
	foreignKey: "userId",
});
Note.belongsToMany(Category, {
	through: "Note_Category",
	foreignKey: "noteId",
	onDelete: "CASCADE",
});
Category.belongsToMany(Note, {
	through: "Note_Category",
	foreignKey: "categoryId",
	onDelete: "CASCADE",
});

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
