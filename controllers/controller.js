const sqlite3 = require("sqlite3");
const {validationResult } = require("express-validator");
const passport = require("passport");
const db = require("../db")


exports.index = (req, res) => {
  db.get("SELECT * FROM menu WHERE id_menu=?", 1, (err, menu) => {
    callback(menu);
  });
  function callback(menu) {
    res.render("index", { menu: menu });
  }
};

exports.admin = (req, res) => {
  if (req.user) {
    res.redirect("/admin/menu");
  } else{
    res.render("admin");
  }
};

exports.admin_login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("admin", { validaciones: errors.array() });
  } else {
    passport.authenticate("local", {
      successRedirect: "/admin/menu",
      failureRedirect: "/admin",
    })(req, res);
  }
};

exports.admin_menu = (req, res) => {
  if (!req.user) {
    return res.redirect("/admin");
  }
  res.render("menu");
};

exports.admin_edit_menu = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("menu", { validaciones: errors.array(), valores: req.body });
  } else {
    const { primerTiempo, segundoTiempo, tercerTiempo } = req.body;
    db.run(
      "UPDATE menu SET primer_tiempo=?, segundo_tiempo=?, tercer_tiempo=? WHERE id_menu=?",
      [
        primerTiempo,
        segundoTiempo,
        tercerTiempo.split(",").map((a) => a.trim()),
        1,
      ]
    );
    res.redirect("/");
  }
};