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

class TransactionController{
  static async allUnpaid(req, res, next){
    const UserId = req.user.id
    try {
      const result = await Transaction.findAll({
        where: {
          UserId,
          isPaid: false
        },
        include: [{model: Customer}, {model: Product}]
      })

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async allPaid(req, res, next){
    const UserId = req.user.id
    try {
      const result = await Transaction.findAll({
        where: {
          UserId,
          isPaid: true
        },
        include: [{model: Customer},  {model: Product}]
      })

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController