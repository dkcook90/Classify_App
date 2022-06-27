const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
	signToken: function ({ email, role, username, _id }) {
		const payload = { email, role, username, _id };
		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},
};
