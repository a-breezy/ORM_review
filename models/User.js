const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4],
			},
		},
	},
	{
		hooks: {
			// promise to hash password on new user creation
			async beforeCreate(newUserData) {
				// set new userPassword to bcrypt hash asynchronously
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			// promise to update users password
			async beforeUpdate(updatedUserData) {
				updatedUserData.password = await bcrypt.hash(
					updatedUserData.password,
					10
				);
				return updatedUserData;
			},
		},

		// pass sequelize connection
		sequelize,
		timestamps: false,
		freezeTableName: true,
		// use underscore rather than camelcase
		underscored: true,
		modelName: "user",
	}
);

module.exports = User;
