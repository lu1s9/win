const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
  res.render("index");
};

exports.admin = (req, res) => {
  res.render("admin");
};

exports.admin_login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("admin", { validaciones: errors.array() });
  } else {
    res.send("validacion exitosa");
  }
};
