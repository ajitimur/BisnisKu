const {
	Customer,
	Ledger,
	Product,
	Transaction,
	sequelize,
} = require("../models");
const { getAccount, accounts } = require("../helpers/dataAccounts");
class PembelianController {
	static async pembelianCash(req, res, next) {
		const { productName, quantity, unit, basePrice, sellPrice } = req.body;
		const UserId = req.user.id;
		const t = await sequelize.transaction();
		let totalDebet = 0;
		let totalKredit = 0;
		const buyPrice = quantity * basePrice;
		try {
			const kasDebet = await Ledger.findAll(
				{
					where: {
						AccountId: accounts.Kas,
						UserId: UserId,
						transactionType: "Debet",
					},
				},
				{ transaction: t }
			);
			const kasKredit = await Ledger.findAll(
				{
					where: {
						AccountId: accounts.Kas,
						UserId: UserId,
						transactionType: "Credit",
					},
				},
				{ transaction: t }
			);

			kasDebet.forEach((el) => {
				totalDebet += el.amount;
			});
			kasKredit.forEach((el) => {
				totalKredit += el.amount;
			});

			const balance = totalDebet - totalKredit;
			if (balance - buyPrice < 0) {
				throw {
					name: "PembelianError",
					msg: "insufficient money",
				};
			}
			//   res.status(200).json({ msg: balance - buyPrice });
			const checkProduct = await Product.findOrCreate({
				where: { productName, UserId },
				defaults: {
					quantity,
					unit,
					basePrice,
					UserId,
					sellPrice,
				},
			});
			if (checkProduct[1]) {
				// cata di ledger
				const amount = basePrice * quantity;
				const ledger = [
					{
						AccountId: accounts.Persediaan, //persediaan
						transactionType: "Debet",
						amount,
						UserId,
					},
					{
						AccountId: accounts.Kas, //kas
						transactionType: "Credit",
						amount,
						UserId,
					},
				];
				await Ledger.bulkCreate(ledger, { transaction: t });

				await t.commit();

				res.status(200).json(checkProduct);
			} else {
				// catat di ledger
				const amount = basePrice * quantity;
				const ledger = [
					{
						AccountId: accounts.Persediaan, //persediaan
						transactionType: "Debet",
						amount,
						UserId,
					},
					{
						AccountId: accounts.Kas, //kas
						transactionType: "Credit",
						amount,
						UserId,
					},
				];
				const check = await Ledger.bulkCreate(ledger, { transaction: t });
				console.log(check);
				const checkProductPrice =
					checkProduct[0].basePrice * checkProduct[0].quantity;
				const newProductPrice = basePrice * quantity;
				const divisor = +checkProduct[0].quantity + +quantity;
				const sum = checkProductPrice + newProductPrice;
				const newBasePrice = sum / divisor;
				const newQuantity = +checkProduct[0].quantity + +quantity;
				let updateData = {};
				if (sellPrice) {
					updateData = {
						basePrice: Math.round(newBasePrice),
						quantity: newQuantity,
						sellPrice,
					};
				}
        // else {
				// 	updateData = {
				// 		basePrice: Math.round(newBasePrice),
				// 		quantity: newQuantity,
				// 	};
				// } //gatau buat apa,matiin aja dulu

				const updateProductPrice = await Product.update(
					updateData,
					{
						where: {
							productName,
							UserId,
						},
						returning: true,
					},
					{ transaction: t }
				);
				await t.commit();

				res.status(200).json(updateProductPrice);
			}
		} catch (err) {
			await t.rollback();
			// console.log(err); //err.message -> "insufficient money" err.name -> Error
			// res.json(err);
			next(err);
		}
	}

	static async pembelianBank(req, res, next) {
		const { productName, quantity, unit, basePrice, sellPrice } = req.body;
		const UserId = req.user.id;
		const t = await sequelize.transaction();
		let totalDebet = 0;
		let totalKredit = 0;
		const buyPrice = quantity * basePrice;
		try {
			const bankDebet = await Ledger.findAll(
				{
					where: {
						AccountId: accounts.Bank,
						UserId: UserId,
						transactionType: "Debet",
					},
				},
				{ transaction: t }
			);
			const bankKredit = await Ledger.findAll(
				{
					where: {
						AccountId: accounts.Bank,
						UserId: UserId,
						transactionType: "Credit",
					},
				},
				{ transaction: t }
			);

			bankDebet.forEach((el) => {
				totalDebet += el.amount;
			});
			bankKredit.forEach((el) => {
				totalKredit += el.amount;
			});

			const balance = totalDebet - totalKredit;
			if (balance - buyPrice < 0) {
				throw {
					name: "PembelianError",
					msg: "insufficient money",
				};
			}
			//   res.status(200).json({ msg: balance - buyPrice });
			const checkProduct = await Product.findOrCreate({
				where: { productName, UserId },
				defaults: {
					quantity,
					unit,
					basePrice,
					UserId,
					sellPrice,
				},
			});
			if (checkProduct[1]) {
				// cata di ledger
				const amount = basePrice * quantity;
				const ledger = [
					{
						AccountId: accounts.Persediaan, //persediaan
						transactionType: "Debet",
						amount,
						UserId,
					},
					{
						AccountId: accounts.Bank, //bank
						transactionType: "Credit",
						amount,
						UserId,
					},
				];
				await Ledger.bulkCreate(ledger, { transaction: t });

				await t.commit();

				res.status(200).json(checkProduct);
			} else {
				// catat di ledger
				const amount = basePrice * quantity;
				const ledger = [
					{
						AccountId: accounts.Persediaan, //persediaan
						transactionType: "Debet",
						amount,
						UserId,
					},
					{
						AccountId: accounts.Bank, //Bank
						transactionType: "Credit",
						amount,
						UserId,
					},
				];
				const check = await Ledger.bulkCreate(ledger, { transaction: t });
				console.log(check);
				const checkProductPrice =
					checkProduct[0].basePrice * checkProduct[0].quantity;
				const newProductPrice = basePrice * quantity;
				const divisor = +checkProduct[0].quantity + +quantity;
				const sum = checkProductPrice + newProductPrice;
				const newBasePrice = sum / divisor;
				const newQuantity = +checkProduct[0].quantity + +quantity;
				let updateData = {};
				if (sellPrice) {
					updateData = {
						basePrice: Math.round(newBasePrice),
						quantity: newQuantity,
						sellPrice,
					};
				} 
        // else {
				// 	updateData = {
				// 		basePrice: Math.round(newBasePrice),
				// 		quantity: newQuantity,
				// 	};
				// }

				const updateProductPrice = await Product.update(
					updateData,
					{
						where: {
							productName,
							UserId,
						},
						returning: true,
					},
					{ transaction: t }
				);
				await t.commit();

				res.status(200).json(updateProductPrice);
			}
		} catch (err) {
			await t.rollback();
			next(err);
		}
	}

	static async pembelianHutang(req, res, next) {
		const { productName, quantity, unit, basePrice, sellPrice } = req.body;
		const UserId = req.user.id;
		const t = await sequelize.transaction();
		let totalDebet = 0;
		let totalKredit = 0;
		const buyPrice = quantity * basePrice;
		try {
			//   res.status(200).json({ msg: balance - buyPrice });
			const checkProduct = await Product.findOrCreate({
				where: { productName, UserId },
				defaults: {
					quantity,
					unit,
					basePrice,
					UserId,
					sellPrice,
				},
			});
			if (checkProduct[1]) {
				// cata di ledger
				const amount = basePrice * quantity;
				const ledger = [
					{
						AccountId: accounts.Persediaan, //persediaan
						transactionType: "Debet",
						amount,
						UserId,
					},
					{
						AccountId: accounts.Hutang, //Hutang
						transactionType: "Credit",
						amount,
						UserId,
					},
				];
				await Ledger.bulkCreate(ledger, { transaction: t });

				await t.commit();

				res.status(200).json(checkProduct);
			} else {
				// catat di ledger
				const amount = basePrice * quantity;
				const ledger = [
					{
						AccountId: accounts.Persediaan, //persediaan
						transactionType: "Debet",
						amount,
						UserId,
					},
					{
						AccountId: accounts.Hutang, //Hutang
						transactionType: "Credit",
						amount,
						UserId,
					},
				];
				const check = await Ledger.bulkCreate(ledger, { transaction: t });
				console.log(check);
				const checkProductPrice =
					checkProduct[0].basePrice * checkProduct[0].quantity;
				const newProductPrice = basePrice * quantity;
				const divisor = +checkProduct[0].quantity + +quantity;
				const sum = checkProductPrice + newProductPrice;
				const newBasePrice = sum / divisor;
				const newQuantity = +checkProduct[0].quantity + +quantity;
				let updateData = {};
				if (sellPrice) {
					updateData = {
						basePrice: Math.round(newBasePrice),
						quantity: newQuantity,
						sellPrice,
					};
				} 
        // else {
				// 	updateData = {
				// 		basePrice: Math.round(newBasePrice),
				// 		quantity: newQuantity,
				// 	};
				// }

				const updateProductPrice = await Product.update(updateData, {
					where: {
						productName,
						UserId,
					},
					returning: true,
				});
				await t.commit();

				res.status(200).json(updateProductPrice);
			}
		} catch (err) {
			await t.rollback();
			// console.log(err); //err.message -> "insufficient money" err.name -> Error
			// res.status(400).json(err.message);
      next(err);
		}
	}
}
module.exports = PembelianController;
