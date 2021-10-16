const { Product } = require("../models")

class ProductController{
  static async getAllProduct(req, res, next){
    const UserId = req.user.id
    try {
      const result = await Product.findAll({
        where: { UserId }
      })
    } catch (error) {
      next()
    }
  }
}

module.exports = ProductController