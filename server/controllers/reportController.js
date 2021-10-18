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

class ReportController{
  static async labaRugi(req, res, next){
    const UserId = req.user.id
    const { startDate, endDate } = req.body //filter date dari client
    // console.log(new Date(startDate), new Date(endDate));
    let totalPenjualanDebet = 0
    let totalPenjualanCredit = 0
    let totalHppDebet = 0
    let totalHppCredit = 0
    let totalBebanDebet = 0
    let totalBebanCredit = 0
    const t = await sequelize.transaction();
    
    try {
      //Cari saldo penjualan
      const penjualanDebet = await Ledger.findAll({
        where: {
          AccountId: 7,
          UserId,
          transactionType: "Debet",
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      },
      {
        transaction: t
      })
      const penjualanCredit = await Ledger.findAll({
        where: {
          AccountId: 7,
          UserId,
          transactionType: "Credit",
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      },
      {
        transaction: t
      })
      penjualanDebet.forEach((el) => {
        totalPenjualanDebet += el.amount;
      });
      penjualanCredit.forEach((el) => {
        totalPenjualanCredit += el.amount;
      });
      console.log(penjualanDebet, `<<<debet`, penjualanCredit, `<<<credit`);
      const balancePenjualan = totalPenjualanCredit - totalPenjualanDebet;
      // End of cari Balance Penjualan
      // Cari saldo HPP
      const hppDebet = await Ledger.findAll({
        where: {
          AccountId: 8,
          UserId,
          transactionType: "Debet",
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      },
      {
        transaction: t
      })
      const hppCredit = await Ledger.findAll({
        where: {
          AccountId: 8,
          UserId,
          transactionType: "Credit",
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      },
      {
        transaction: t
      })
      hppDebet.forEach((el) => {
        totalHppDebet += el.amount;
      });
      hppCredit.forEach((el) => {
        totalHppCredit += el.amount;
      });
      const balanceHpp = totalHppDebet - totalHppCredit;
      //End of balance HPP
      //Cari balance beban
      const bebanDebet = await Ledger.findAll({
        where: {
          AccountId: 9,
          UserId,
          transactionType: "Debet",
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      },
      {
        transaction: t
      })
      const bebanCredit = await Ledger.findAll({
        where: {
          AccountId: 9,
          UserId,
          transactionType: "Credit",
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      },
      {
        transaction: t
      })
      bebanDebet.forEach((el) => {
        totalBebanDebet += el.amount;
      });
      bebanCredit.forEach((el) => {
        totalBebanCredit += el.amount;
      });
      const balanceBeban = totalBebanDebet - totalBebanCredit;
      const balanceLabaRugi = balancePenjualan - balanceHpp - balanceBeban

			const result = {
				balancePenjualan,
				balanceHpp,
				balanceBeban,
				balanceLabaRugi,
			};


      await t.commit();
      res.status(200).json(result)
    } catch (error) {
      console.log(error);
      await t.rollback()
      next(error)
    }
  }

	static async neracaSaldo(req, res, next) {
		//sek bingung
		const UserId = req.user.id;
		const { startDate, endDate } = req.body; //filter date dari client
		const t = await sequelize.transaction();
		try {
		} catch (error) {}
	}
}

module.exports = ReportController;
