const { Ledger, sequelize } = require("../models");

class ModalController {
  static async addModalCash(req, res, next) {
    const { modal } = req.body;
    const userId = req.user.id;
    const t = await sequelize.transaction();
    try {
      const ledger = [
        {
          AccountId: 1, //Kas
          transactionType: "Debet",
          amount: modal,
          UserId: userId,
        },
        {
          AccountId: 6, //Modal
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
      console.log(err);
    }
  }

  static async addModalBank(req, res, next) {
    const { modal } = req.body;
    const userId = req.user.id;
    const t = await sequelize.transaction();
    try {
      const ledger = [
        {
          AccountId: 2, //Bank
          transactionType: "Debet",
          amount: modal,
          UserId: userId,
        },
        {
          AccountId: 6, //Modal
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
      console.log(err);
    }
  }

}

module.exports = ModalController;
