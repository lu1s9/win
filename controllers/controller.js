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

exports.admin_menu = (req, res) => {
    res.render("menu")
}

exports.admin_edit_menu = (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors.array())
        res.render("menu", {validaciones: errors.array(), valores: req.body})
    } else {
        res.send('validacion exitosa')
    }
}