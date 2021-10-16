const { Product } = require("../models")

class ProductController{
  static async getAllProduct(req, res, next){
    const UserId = req.user.id
    try {
      const result = await Product.findAll({
        where: { UserId }
      })

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getOneProduct(req, res, next){
    const ProductId = req.params.id
    try {
      const result = await Product.findOne({ where : { ProductId }})

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController