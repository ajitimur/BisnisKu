const { Ledger, sequelize } = require("../models");
const { getAccount, accounts } = require("../helpers/dataAccounts");
class ModalController {
	static async addModalCash(req, res, next) {
		const { modal } = req.body;
		const userId = req.user.id;
		const t = await sequelize.transaction();
		try {
			const ledger = [
				{
					AccountId: accounts.Kas, //Kas
					transactionType: "Debet",
					amount: modal,
					UserId: userId,
				},
				{
					AccountId: accounts.Modal, //Modal
					transactionType: "Credit",
					amount: modal,
					UserId: userId,
				},
			];
			const result = await Ledger.bulkCreate(ledger, { transaction: t });

			await t.commit();
			res.status(201).json(result);
		} catch (err) {
			await t.rollback();
			next(err);
		}
	}

	static async addModalBank(req, res, next) {
		const { modal } = req.body;
		const userId = req.user.id;
		const t = await sequelize.transaction();
		try {
			const ledger = [
				{
					AccountId: accounts.Bank, //Bank
					transactionType: "Debet",
					amount: modal,
					UserId: userId,
				},
				{
					AccountId: accounts.Modal, //Modal
					transactionType: "Credit",
					amount: modal,
					UserId: userId,
				},
			];
			const result = await Ledger.bulkCreate(ledger, { transaction: t });
			await t.commit();
			res.status(201).json(result);
		} catch (err) {
			await t.rollback();
			next(err);
		}
	}
}

module.exports = ModalController;
