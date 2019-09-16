var express = require('express');
var router = express.Router();

var users = [
  {
    name: "test",
    password: "test",
    type: "test",
    email: "test@test.ru",
  },
  {
    name: "test1",
    password: "test1",
    type: "test1",
    email: "test1@test.ru",
  },
  {
    name: "test2",
    password: "test2",
    type: "test2",
    email: "test2@test.ru",
  },
  {
    name: "test3",
    password: "test3",
    type: "test3",
    email: "test3@test.ru",
  },
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(users);
});

module.exports = router;
