var express = require('express');
var router = express.Router();
import models from "../database";

router.get('/', function(req, res, next) {
    let test = models;
    models.Articles.findAll({include: models.Users})
        .then(result => {
            return result.map(data => data.dataValues);
        }).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(400).send(err);
    });
});

module.exports = router;
