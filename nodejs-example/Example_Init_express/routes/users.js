import {UserTypes} from "../../database/dto/user";

var express = require('express');
var router = express.Router();
import models from "../../database";

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Users.findAll()
      .then(result => {
          return result.map(data => data.dataValues);
      }).then(result => {
      res.render('users',{
          layout: 'container',
          container : {
              title: 'User List'
          },
          users: result,
          usersType: Object.values(UserTypes)
      });
      }).catch(err => {
          res.status(400).send(err);
      });
});

module.exports = router;
