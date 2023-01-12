var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controllers/controller");

router.get("/", controller.index);

router.get("/admin", controller.admin);

router.post(
  "/admin",
  body("user").exists().not().isEmpty(),
  body("password").exists().not().isEmpty(),
  controller.admin_login
);


router.get("/admin/menu", controller.admin_menu)

router.post(
  "/admin/menu",
  body("primerTiempo", "Completa el primer campo").exists().not().isEmpty().bail().isLength({ min: 10 }),
  body("segundoTiempo", "Completa el segundo campo").exists().not().isEmpty().bail().isLength({ min: 10 }),
  body("tercerTiempo", "Completa el tercer campo").exists().not().isEmpty().bail().isLength({ min: 10 }),
  controller.admin_edit_menu
);



module.exports = router;
