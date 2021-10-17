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

class CustomerController{
  static async findAll(req, res, next){
    const UserId = req.user.id;
    try {
      const result = await Customer.findAll({
        where: {
          UserId
        }
      })

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CustomerController