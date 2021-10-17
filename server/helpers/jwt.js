const jwt = require(`jsonwebtoken`);
const secret = process.env.SECRET || "shhh";

function sign(payload) {
	return jwt.sign(payload, secret);
}
function verify(token) {
	return jwt.verify(token, secret);
}

module.exports = { sign, verify };
