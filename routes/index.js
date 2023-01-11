var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', (req,res) => {
  res.render('index')
})

router.get('/admin', (req, res) => {
  res.render('admin')
})

router.post('/admin', 
  body('user').exists().not().isEmpty(),
  body('password').exists().not().isEmpty(),
  (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.render('admin', {validaciones: errors.array()})
  }
  else{
    res.send('Validacion exitosa')
  }
})

module.exports = router;
