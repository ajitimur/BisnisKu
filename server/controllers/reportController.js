const {
	Customer,
	Ledger,
	Product,
	Transaction,
	sequelize,
	Sequelize,
} = require("../models");
const Op = Sequelize.Op;
const { getAccount, accounts } = require("../helpers/dataAccounts");
const dayjs = require("dayjs");
const { QueryTypes } = require("sequelize");

class ReportController {
	static async labaRugi(req, res, next) {
		const UserId = req.user.id;
		const today = new Date();
		const startDate = today.getDate();

		try {
			//Cari saldo penjualan
			// let sevenDaysAgo = dayjs(new Date()).subtract(7, 'day').format('DD')
			// console.log(sevenDaysAgo, 'test')
			const penjualan = await sequelize.query(
				`SELECT Sum(amount) AS "penjualan", DATE("createdAt") FROM "Ledgers"
      where extract(day from "createdAt") <= '${startDate}' AND extract(day from "createdAt") >= '${
					startDate - 7
				}'
      And "AccountId" = 7 And "UserId" = ${UserId}
      GROUP BY date;`,
				{ type: QueryTypes.SELECT }
			);
			// console.log(penjualan, 'isi credit')

			const hppBalance = await sequelize.query(
				`SELECT Sum(amount) AS "HPP", DATE("createdAt") FROM "Ledgers"
      where extract(day from "createdAt") <= '${startDate}' AND extract(day from "createdAt") >= '${
					startDate - 7
				}'
      And "AccountId" = 8 And "UserId" = ${UserId}
      GROUP BY date;`,
				{ type: QueryTypes.SELECT }
			);

			const bebanBalance = await sequelize.query(
				`SELECT Sum(amount) AS "HPP", DATE("createdAt") FROM "Ledgers"
      where extract(day from "createdAt") <= '${startDate}' AND extract(day from "createdAt") >= '${
					startDate - 7
				}'
      And "AccountId" = 9 And "UserId" = ${UserId}
      GROUP BY date;`,
				{ type: QueryTypes.SELECT }
			);

			res.status(200).json({ penjualan, hppBalance, bebanBalance });
		} catch (error) {
			// console.log(error, `<<<<<<<`);
			next(error);
		}
	}

	static async labaRugiBulanan(req, res, next) {
		const UserId = req.user.id;
		const today = new Date();
		const currentMonth = today.getMonth() + 1;

		try {
			console.log(today, currentMonth);
			const penjualan = await sequelize.query(
				`SELECT Sum(amount) AS "penjualan", DATE("createdAt") FROM "Ledgers"
      where extract(month from "createdAt") = '${currentMonth}'
      And "AccountId" = 7 And "UserId" = ${UserId}
      GROUP BY date;`,
				{ type: QueryTypes.SELECT }
			);
			// console.log(penjualan, 'isi credit')

			const hppBalance = await sequelize.query(
				`SELECT Sum(amount) AS "HPP", DATE("createdAt") FROM "Ledgers"
      where extract(month from "createdAt") = '${currentMonth}'
      And "AccountId" = 8 And "UserId" = ${UserId}
      GROUP BY date;`,
				{ type: QueryTypes.SELECT }
			);

			const bebanBalance = await sequelize.query(
				`SELECT Sum(amount) AS "beban", DATE("createdAt") FROM "Ledgers"
      where extract(month from "createdAt") = '${currentMonth}'
      And "AccountId" = 9 And "UserId" = ${UserId}
      GROUP BY date;`,
				{ type: QueryTypes.SELECT }
			);

			penjualan.forEach((el, i) => {
				el.grossProfit = el.penjualan - hppBalance[i].HPP;
			});

			res.status(200).json({ penjualan, hppBalance, bebanBalance });
		} catch (error) {
			next(error);
		}
	}

	static async getSaldo(req, res, next) {
		const UserId = req.user.id;
		let totalKasDebet = 0;
		let totalKasKredit = 0;
		let totalBankDebet = 0;
		let totalBankKredit = 0;
		let totalPiutangDebet = 0;
		let totalPiutangKredit = 0;
		let totalHutangkDebet = 0;
		let totalHutangkKredit = 0;
		const t = await sequelize.transaction();
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
				totalKasDebet += el.amount;
			});
			kasKredit.forEach((el) => {
				totalKasKredit += el.amount;
			});

			const balanceKas = totalKasDebet - totalKasKredit;

			//Bank
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
				totalBankDebet += el.amount;
			});
			bankKredit.forEach((el) => {
				totalBankKredit += el.amount;
			});

			const balanceBank = totalBankDebet - totalBankKredit;

			//piutang
			const piutangDebet = await Ledger.findAll(
				{
					where: {
						AccountId: accounts.Piutang,
						UserId: UserId,
						transactionType: "Debet",
					},
				},
				{ transaction: t }
			);
			const piutangKredit = await Ledger.findAll(
				{
					where: {
						AccountId: accounts.Piutang,
						UserId: UserId,
						transactionType: "Credit",
					},
				},
				{ transaction: t }
			);

			piutangDebet.forEach((el) => {
				totalPiutangDebet += el.amount;
			});
			piutangKredit.forEach((el) => {
				totalPiutangKredit += el.amount;
			});

			const balancePiutang = totalPiutangDebet - totalPiutangKredit;

			//Hutang
			const hutangDebet = await Ledger.findAll(
				{
					where: {
						AccountId: accounts.Hutang,
						UserId: UserId,
						transactionType: "Debet",
					},
				},
				{ transaction: t }
			);
			const hutangKredit = await Ledger.findAll(
				{
					where: {
						AccountId: accounts.Hutang,
						UserId: UserId,
						transactionType: "Credit",
					},
				},
				{ transaction: t }
			);

			hutangDebet.forEach((el) => {
				totalHutangkDebet += el.amount;
			});
			hutangKredit.forEach((el) => {
				totalHutangkKredit += el.amount;
			});

			const balanceHutang = totalHutangkKredit - totalHutangkDebet;

			await t.commit();

			res
				.status(200)
				.json({ balanceKas, balanceBank, balancePiutang, balanceHutang });
		} catch (error) {
			await t.rollback();
			console.log(error);
			next(error);
		}
	}
}

module.exports = ReportController;
