const {
	Customer,
	Ledger,
	Product,
	Transaction,
	sequelize,
} = require("../models");

class PenjualanController {
	static async penjualanCash(req, res, next) {
		const { customer, product } = req.body; //customer berisi object data customer, product object isi data product yg dijual
		console.log(
			"🚀 ~ file: penjualanController.js ~ line 12 ~ PenjualanController ~ penjualanCash ~ customer",
			customer
		);
		console.log(
			"🚀 ~ file: penjualanController.js ~ line 12 ~ PenjualanController ~ penjualanCash ~ product",
			product
		);
		const productId = product.id;
		const userId = req.user.id;
		const customerId = customer.id;
		console.log(
			"🚀 ~ file: penjualanController.js ~ line 9 ~ PenjualanController ~ penjualanCash ~ customerId",
			customerId
		);

		const t = await sequelize.transaction();
		try {
			const foundProduct = await Product.findByPk(productId);

			if (foundProduct) {
				const oldQuantity = foundProduct.quantity;
				const newQuantity = oldQuantity - product.sellQuantity;

				//Cek misal yg ngejual lebih dari stock yg ada
				if (newQuantity < 0) {
					//Disini throw error
					throw {
						name: `Bad request`,
						code: 400,
						message: `Cannot sell more than available quantity`,
					};
				}

				//Mengurangi quantity di table product
				await Product.update(
					{
						quantity: newQuantity,
					},
					{
						where: { id: productId },
					},
					{
						transaction: t,
					}
				);

				//cek udah punya customerId apa belom, kalo belum create new customer
				if (!customerId) {
					const newCustomer = await Customer.create(
						{
							name: customer.name,
							email: customer.email,
							phoneNumber: customer.phoneNumber,
							UserId: userId,
						},
						{
							transaction: t,
						}
					);

					customerId = newCustomer.id; //assign value id newCustomer
				}

				//Create new transaction
				const transaction = await Transaction.create(
					{
						UserId: userId,
						CustomerId: customerId,
						ProductId: productId,
						quantity: product.sellQuantity,
						amount: product.amount,
						dueDate: new Date(),
						isPaid: true,
					},
					{
						transaction: t,
					}
				);

				//Create Ledger
				const ledger = [
					{
						AccountId: 1, //Kas
						transactionType: "Debet",
						amount: product.amount,
						UserId: userId,
					},
					{
						AccountId: 3, //Persediaan
						transactionType: "Credit",
						amount: foundProduct.basePrice * product.quantity,
						UserId: userId,
					},
					{
						AccountId: 8, //HPP
						transactionType: "Debet",
						amount: foundProduct.basePrice * product.quantity,
						UserId: userId,
					},
					{
						AccountId: 7, //Penjualan
						transactionType: "Debet",
						amount: product.amount,
						UserId: userId,
						TransactionId: transaction.id,
					},
				];

				const result = await Ledger.bulkCreate(ledger, { transaction: t });

				await t.commit();
				res.status(201).json(result);
			} else {
				//Throw error not found
				throw {
					name: `NOTFOUND`,
					code: 404,
					message: `Product does not exists`,
				};
			}
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}

	static async penjualanPiutang(req, res, next) {
		const { customer, product } = req.body; //customer berisi object data customer, product object isi data product yg dijual
		const productId = product.id;
		const userId = req.user.id;
		const customerId = customer.id;

		const t = await sequelize.transaction();
		try {
			const foundProduct = await Product.findByPk(productId);

			if (foundProduct) {
				const oldQuantity = foundProduct.quantity;
				const newQuantity = oldQuantity - product.sellQuantity;

				//Cek misal yg ngejual lebih dari stock yg ada
				if (newQuantity < 0) {
					//Disini throw error
					throw {
						name: `Bad request`,
						code: 400,
						message: `Cannot sell more than available quantity`,
					};
				}

				//Mengurangi quantity di table product
				await Product.update(
					{
						quantity: newQuantity,
					},
					{
						where: { id: productId },
					},
					{
						transaction: t,
					}
				);

				//cek udah punya customerId apa belom, kalo belum create new customer
				if (!customerId) {
					const newCustomer = await Customer.create(
						{
							name: customer.name,
							email: customer.email,
							phoneNumber: customer.phoneNumber,
							UserId: userId,
						},
						{
							transaction: t,
						}
					);

					customerId = newCustomer.id; //assign value id newCustomer
				}

				//Create new transaction
				const transaction = await Transaction.create(
					{
						UserId: userId,
						CustomerId: customerId,
						ProductId: productId,
						quantity: product.sellQuantity,
						amount: product.amount,
						dueDate: product.dueDate,
						isPaid: false,
					},
					{
						transaction: t,
					}
				);

				//Create Ledger
				const ledger = [
					{
						AccountId: 4, //Piutang
						transactionType: "Debet",
						amount: product.amount,
						UserId: userId,
					},
					{
						AccountId: 3, //Persediaan
						transactionType: "Credit",
						amount: foundProduct.basePrice * product.quantity,
						UserId: userId,
					},
					{
						AccountId: 8, //HPP
						transactionType: "Debet",
						amount: foundProduct.basePrice * product.quantity,
						UserId: userId,
					},
					{
						AccountId: 7, //Penjualan
						transactionType: "Debet",
						amount: product.amount,
						UserId: userId,
						TransactionId: transaction.id,
					},
				];

				const result = await Ledger.bulkCreate(ledger, { transaction: t });

				await t.commit();
				res.status(201).json(result);
			} else {
				//Throw error not found
				throw {
					name: `NOTFOUND`,
					code: 404,
					message: `Product does not exists`,
				};
			}
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
}

module.exports = PenjualanController;
