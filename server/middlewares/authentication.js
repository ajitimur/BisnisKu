const { verify } = require(`../helpers/jwt`);
const { User } = require(`../models`);
const adminAuthentication = async (req, res, next) => {
	// console.log(
	// 	"🚀 ~ file: authentication.js ~ line 4 ~ adminAuthentication ~ req",
	// 	req
	// );
	const token = req.headers.access_token;
	console.log(
		"🚀 ~ file: authentication.js ~ line 9 ~ adminAuthentication ~ token",
		token
	);
	try {
		const payload = verify(token);
		console.log(
			"🚀 ~ file: authentication.js ~ line 7 ~ adminAuthentication ~ token",
			token
		);
		console.log(
			"🚀 ~ file: authentication.js ~ line 7 ~ adminAuthentication ~ payload",
			payload
		);
		const checkUser = await User.findOne({
			where: { id: payload.id, username: payload.username },
		});
		console.log(
			"🚀 ~ file: authentication.js ~ line 10 ~ adminAuthentication ~ checkUser",
			checkUser
		);

		req.user = {
			id: checkUser.id,
			username: checkUser.username,
			businessName: checkUser.businessName,
		};
		next();
	} catch (err) {
		next({ name: "authentication", statuscode: 401, msg: `Invalid JWT` });
	}
};
module.exports = { adminAuthentication };
