const { verify } = require(`../helpers/jwt`);
const { User } = require(`../models`);
const adminAuthentication = async (req, res, next) => {
  const token = req.headers.access_token;
  try {
    const payload = verify(token);
    const checkUser = await User.findOne({
      where: { id: payload.id, username: payload.username },
    });
    if (!checkUser) {
      throw new Error(`UserNotFound`);
    }
    req.user = {
      id: checkUser.id,
      username: checkUser.username,
      businessName: checkUser.businessName,
    };
    next();
  } catch (err) {
    console.log(err);
    if (err.message === `UserNotFound`) {
      next({ statuscode: 401, msg: `JWT is tampered ` });
    } else {
      next({ statuscode: 401, msg: `Invalid JWT` });
    }
  }
};
module.exports = { adminAuthentication };
