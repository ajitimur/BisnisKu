const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = `Internal Server Error`;
  if (
    err.name === `SequelizeValidationError` ||
    err.name === `SequelizeUniqueConstraintError` ||
    err.name === `SequelizeDatabaseError`
  ) {
    code = 400;
    errors = [];
    // err.errors.forEach()
    err.errors.forEach((e) => {
      errors.push(e.message);
    });
    res.status(code).json(errors);
  } else if (err.name === `SequelizeForeignKeyConstraintError`) {
    code = 404;
    res.status(code).json({
      statuscode: code,
      msg: `theres something wrong`,
    });
  } else {
    res.status(code).json({ statuscode: code, msg });
  }
};

module.exports = errorHandler;
