const {
	Customer,
	Ledger,
	Product,
	Transaction,
	sequelize,
} = require("../models");

const { getAccount, accounts } = require("../helpers/dataAccounts");

    let { amount, description } = req.body;
    const UserId = req.user.id;
    const t = await sequelize.transaction();
    let totalDebet = 0;
    let totalKredit = 0;
    
		try {
      const kasDebet = await Ledger.findAll({
        where: {
          AccountId: 1,
          UserId: UserId,
          transactionType: "Debet",
        },
      },
      { transaction: t }
      );
      const kasKredit = await Ledger.findAll({
        where: {
          AccountId: 1,
          UserId: UserId,
          transactionType: "Credit",
        },
      },
      { transaction: t }
      );
      // console.log(kasDebet,`<<<<< Debet` , kasKredit, `<<<<< Kredit`);
      
      kasDebet.forEach((el) => {
        totalDebet += el.amount;
      });
      kasKredit.forEach((el) => {
        totalKredit += el.amount;
      });

      // console.log(totalDebet, totalKredit, `=======`);

      const balance = totalDebet - totalKredit;
      if (balance - amount < 0) {
        throw new Error("insufficient money");
      }

      const ledger = [
        {
          AccountId: 9, //beban
          description,
          transactionType: "Debet",
          amount,
          UserId,
        },
        {
          AccountId: 1, //kas
          transactionType: "Credit",
          amount,
          UserId,
        }
      ];

      await Ledger.bulkCreate(ledger, { transaction: t });

      await t.commit();

      res.status(200).json({ message: "transaction created"})
		} catch (error) {
      await t.rollback();
      // console.log(error);
			next(error);
		}
	}

<<<<<<< HEAD
	static async spendBank(req, res, next) {
		let { amount, description } = req.body;
		const UserId = req.user.id;
		const t = await sequelize.transaction();
		let totalDebet = 0;
		let totalKredit = 0;
=======
  static async spendBank(req, res, next){

    let { amount, description } = req.body;
    const UserId = req.user.id;
    const t = await sequelize.transaction();
    let totalDebet = 0;
    let totalKredit = 0;

    try {
      const bankDebet = await Ledger.findAll({
        where: {
          AccountId: 2,
          UserId: UserId,
          transactionType: "Debet",
        },
      },
      { transaction: t }
      );
      const bankKredit = await Ledger.findAll({
        where: {
          AccountId: 2,
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
      if (balance - amount < 0) {
        throw new Error("insufficient money");
      }

      const ledger = [
        {
          AccountId: 9, //beban
          description,
          transactionType: "Debet",
          amount,
          UserId,
        },
        {
          AccountId: 2, //Bank
          transactionType: "Credit",
          amount,
          UserId,
        }
      ];

      await Ledger.bulkCreate(ledger, { transaction: t });

      await t.commit();

      res.status(200).json({ message: "transaction created"})

    } catch (error) {
        await t.rollback();
			  next(error);
    }
  }
}
>>>>>>> bd46bd078eb3982b394cf5b96ceae923690aa750

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
				throw new Error("insufficient money");
			}

			const ledger = [
				{
					AccountId: accounts.Beban, //beban
					description,
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

			await Ledger.bulkCreate(ledger, { transaction: t });

			await t.commit();

			res.status(200).json({ message: "transaction created" });
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
}

module.exports = PengeluaranController;
