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

module.exports = router;
