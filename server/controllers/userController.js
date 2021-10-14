const { User, sequelize } = require("../models");
const { sign } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class userController {
  static async login(req, res, next) {
    const { username, password } = req.body;
    try {
      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        const match = await comparePassword(password, foundUser.password);
        if (!match) {
          throw new Error(`usernotfound`);
        } else {
          const access_token = sign({
            id: foundUser.id,
            username: foundUser.username,
            businessName: foundUser.businessName,
          });
          res.status(200).json({
            access_token,
            statuscode: 200,
            msg: "Login Succesful",
          });
        }
      } else {
        throw new Error(`usernotfound`);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async register(req, res, next) {
    const {
      username,
      email,
      password,
      phoneNumber,
      address,
      businessName,
      bankNumber,
    } = req.body;
    const t = await sequelize.transaction();
    try {
      await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        businessName,
        bankNumber,
      });
      await t.commit();
      res
        .status(201)
        .json({ message: `User: ${username} Successfully created` });
    } catch (err) {
      await t.rollback();
      console.log(err);
      next(err);
    }
  }
}

module.exports = userController;
