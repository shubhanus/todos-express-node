const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });

const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(", ")} are required fields.` : "";
};

const getPasswordHash = (password) =>
  crypto.createHash("md5").update(password).digest("hex");

const secret = "adasxovnklnqklnkjdsankdnw"; // FIXME: move to env

const getJwtSignedToken = (user) =>
  jwt.sign({ user: { ...user, createdAt: new Date() } }, secret);

const decodeJwtToken = (token) => jwt.verify(token, secret);

module.exports = {
  successResponse,
  errorResponse,
  validateEmail,
  validateFields,
  getPasswordHash,
  getJwtSignedToken,
  decodeJwtToken,
};
