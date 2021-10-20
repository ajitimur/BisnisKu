const errorHandler = (err, req, res, next) => {
	let code = 500;
	let message = ["internal server error"];
	// res.json(err);
	// console.log("🚀 ~ file: errorHandler.js ~ line 18 ~ errorHandler ~ err", err);
	// console.log(err.name);
	switch (err.name) {
		case "SequelizeValidationError":
		case "SequelizeUniqueConstraintError":
			code = 400;
			message = [];
			for (const i of err.errors) {
				message.push(i.message);
			}

			break;
		case "SequelizeDatabaseError":
			code = 400;
			message = "invalid input";
			break;
		case `Bad request`:
		case "user":
		case "PembelianError":
		case "PengeluaranError":
			code = 400;
			message = err.msg;
			break;
		case "authentication":
			code = 401;
			message = err.msg;
			break;
		case `NOTFOUND`:
		case "Pembayaran":
		case "Product":
			code = 404;
			message = err.msg;
			break;

		default:
			break;
	}
	console.log(message);
	res.status(code).json({ message });
};
module.exports = errorHandler;
