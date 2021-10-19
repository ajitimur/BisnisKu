const errorHandler = (err, req, res, next) => {
	let code = 500;
	let message = ["internal server error"];
	// res.json(err);
	console.log("🚀 ~ file: errorHandler.js ~ line 18 ~ errorHandler ~ err", err);
	switch (err.name) {
		// case "SequelizeUniqueConstraintError":
		// case "SequelizeValidationError":
		case "SequelizeDatabaseError":
			code = 400;
			message = "invalid input";
			break;
		case "PembelianError":
		case "PengeluaranError":
			code = 400;
			message = err.msg;
			break;
		default:
			break;
	}
	res.status(code).json({ message });
};
module.exports = errorHandler;
