const { Product } = require("../models");

class ProductController {
	static async getAllProduct(req, res, next) {
		const UserId = req.user.id;
		try {
			const result = await Product.findAll({
				where: { UserId },
			});

			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getOneProduct(req, res, next) {
		const ProductId = req.params.id;
		console.log(
			"🚀 ~ file: productController.js ~ line 19 ~ ProductController ~ getOneProduct ~ ProductId",
			ProductId
		);
		try {
			const result = await Product.findOne({ where: { id: ProductId } });

			res.status(200).json(result);
		} catch (error) {
			console.log(
				"🚀 ~ file: productController.js ~ line 28 ~ ProductController ~ getOneProduct ~ error",
				error
			);
			next(error);
		}
	}
}

module.exports = ProductController;
