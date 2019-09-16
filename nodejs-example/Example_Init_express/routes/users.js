var express = require('express');
var router = express.Router();
import models from "../../database";

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Users.findAll()
      .then(result => {
          return result.map(data => data.dataValues);
      }).then(result => {
        res.send(result);
      }).catch(err => {
          res.status(400).send(err);
      });
});

module.exports = router;
