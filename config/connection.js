const Sequelize = require("sequelize");

require("dotenv").config();

// create connection to db, pass in mysql creds
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.USERNAME,
	null,
	{
		host: "127.0.0.1",
		dialect: "mysql",
		port: 3306,
	}
);

module.exports = sequelize;
