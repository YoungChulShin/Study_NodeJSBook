var express = require('express');
var User = require('../models').User;

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', async (err, res, next) => {
  try {
    const result = await User.create( {
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    });

    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
