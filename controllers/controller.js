const sqlite3 = require("sqlite3");
const { body, validationResult } = require("express-validator");

const db = new sqlite3.Database(process.env.DB, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to database");
});

exports.index = (req, res) => {
  let primerTiempo, segundoTiempo, tercerTiempo;
  db.get("SELECT * FROM menu WHERE id_menu=?", 1, (err, menu) => {
    callback(menu);
  });

  function callback(menu) {
    res.render("index", { menu: menu });
  }
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