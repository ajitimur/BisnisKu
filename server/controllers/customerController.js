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

  static async createCustomer(req, res, next){
    const UserId = req.user.id;
    const { name, email, phoneNumber } = req.body
    try {
      await Customer.create({ name, email, phoneNumber, UserId })

      res.status(201).json({message: "Customer created"})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CustomerController