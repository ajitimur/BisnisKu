const {
	Account,
	Category,
	Customer,
	Ledger,
	Product,
	Transaction,
	User,
	sequelize,
} = require("../models/index");

class BusinessLogicController {
	static async debtList(req, res, next) {
		try {
			let id = 3; // user yang login di backend

			// let id = req.user.id

			let listData = await Ledger.findAll({
				where: {
					UserId: id,
					AccountId: 14,
				},
			});

			res.status(201).json(listData);
		} catch (error) {
			// next(error);
			res
				.status(error.code || 501)
				.json({ message: error.message || "server error" });
		}
	}

	static async debtPayment(req, res, next) {
		const t = await sequelize.transaction();
		try {
			let id = 3; // user yang login di backend,
			// let id = req.user.id
			let { TransactionId, amount } = req.body; // parameter ini di terima pada saat mobile id dari debt list, amount junlah dari list ledger atau disisendiri
			console.log(TransactionId, amount);

			// menulis di transcation lunas

			let update = await Transaction.update(
				{ isPaid: true },
				{
					where: {
						id: TransactionId,
					},
				},
				{ transaction: t }
			);

			//melihat kas tujuan untuk amount dari kas
			let findKas = await Ledger.findOne({
				where: {
					UserId: id,
					AccountId: 11, //kas
				},
			});
			// menambah kas di kas ledger
			// tidak memerlukan belongs to ladger di model transaction kalau tidak error
			let addKas = await Ledger.update(
				{
					amount: +amount + +findKas.amount,
				},
				{
					where: {
						UserId: id,
						AccountId: 11,
					},
					returning: true,
				},
				{ transaction: t }
			);
			await t.commit();
			res.status(201).json({ message: addKas });
		} catch (error) {
			await t.rollback();
			// next(error);
			res
				.status(error.code || 501)
				.json({ message: error.message || "server error" });
		}
	}

	static async spendCash(req, res, next) {
		try {
			let id = 3; // user yang login di backend,
			// let id = req.user.id
			let { amount } = req.body;
			amount = +amount;
			let findCash = await Ledger.findOne({
				where: {
					UserId: id,
					AccountId: 11, //kas
				},
			});
			let cash = +findCash.amount;
			if (cash < amount) {
				throw {
					code: 400,
					message: "not enough cash",
				};
			} else {
				cash = cash - amount;
			}
			let spendCash = await Ledger.update(
				{
					amount: cash,
				},
				{
					where: {
						UserId: id,
						AccountId: 11,
					},
					returning: true,
				}
			);
			res.status(201).json({ message: spendCash });
		} catch (error) {
			// next(error);

			res
				.status(error.code || 501)
				.json({ message: error.message || "server error" });
		}
	}
}

module.exports = {
	BusinessLogicController,
};
