const bcrypt = require(`bcryptjs`);
const salt = bcrypt.genSaltSync(10);

function encodePassword(password) {
  return bcrypt.hashSync(password, salt);
}
function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
  encodePassword,
  comparePassword,
};
