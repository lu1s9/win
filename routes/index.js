const sqlite3 = require("sqlite3");
var express = require("express");
var router = express.Router();
const { body } = require("express-validator");
const controller = require("../controllers/controller");
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcryptjs = require('bcryptjs')

const db = new sqlite3.Database(process.env.DB, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to database");
});

passport.use(new LocalStrategy(function verify(username, password, cb){
  db.get('SELECT * FROM users WHERE username=?', username, function(err, user){
    if (err) {
      return cb(err)
    }
    if(!user){
      console.log("Not user found")
      return cb(null, false)
    }
    bcryptjs.compare(password, user.hashed_password, function(err, res) {
      return cb(null, user)
    })
  })
}))

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    // cb(null, { id: user.id, username: user.username });
    cb(null, {  username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get("/", controller.index);

router.get("/admin", controller.admin);

router.post(
  "/admin",
  body("username").exists().not().isEmpty(),
  body("password").exists().not().isEmpty(),
  controller.admin_login
);

router.get("/admin/menu", controller.admin_menu)

router.post(
  "/admin/menu",
  body("primerTiempo", "Selecciona al menos una opción en el Primer tiempo").exists(),
  body("segundoTiempo", "Selecciona al menos una opción en el Segundo tiempo").exists(),
  body("tercerTiempo", "Completa el tercer campo").exists().trim().not().isEmpty(),
  controller.admin_edit_menu
);

module.exports = router;
