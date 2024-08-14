module.exports = (req, res, next) => {
  res.success = (data, message = '', statusCode = 200) => {
    res.status(statusCode).send({
      success: true,
      data: data,
      message: message,
    });
  };

  res.error = (message = '', statusCode = 500) => {
    res.status(statusCode).send({
      success: false,
      data: null,
      message: message,
    });
  };

  next();
};
