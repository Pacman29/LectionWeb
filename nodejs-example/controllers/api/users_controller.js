import {route, GET, POST, PUT, DELETE, before} from "awilix-express";
import bodyParser from 'body-parser'
import Sequelize from "sequelize";
import auth from "../auth";
import {generateJWT, toAuthJSON} from "../../database/dto/user";
import passport from "passport";

@route('/users')
class UsersController {

    constructor({userService, userModel}){
        this.userService = userService;
        this.userModel = userModel;
    }

    errorHandler(req, res) {
        return (err) => {
            if(err.statusCode)
                res.status(err.statusCode).send(err.message);
            else if (err instanceof Sequelize.ValidationError)
                res.status(400).send(err.errors.map(e => e.message).join('\n'));
            else
                res.status(500).send(err);
        }
    }

    @route('/')
    @GET()
    @before([auth.required])
    async getAll(req, res, next) {
        let offset = req.query.offset | 0;
        let limit = req.query.limit | 20;
        this.userService.getAll({offset, limit})
            .then(result => res.send(result))
            .catch(this.errorHandler(req, res));
        // res.render('users',{
        //     layout: 'container',
        //     container : {
        //         title: 'User List'
        //     },
        //     users
        // });
    }

    @route('/')
    @POST()
    @before([bodyParser(), auth.optional])
    async create(req, res, next) {
        if(!req.body)
            res.status(400).send("Request body not found");

        this.userModel.build(req.body).validate()
            .then((model) => {
                return this.userService.addUser(model)
            }).then(result => {
                res.send(toAuthJSON(result));
            }).catch(this.errorHandler(req, res));
        //res.redirect('/users');
    }


    @route('/login')
    @POST()
    @before([bodyParser(), auth.optional ])
    async login(req, res, next) {
        if(!req.body)
            res.status(400).send("Request body not found");

        this.userModel.build(req.body).validate()
            .then((model) => {
                return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
                    if(err) {
                        return next(err);
                    }

                    if(passportUser) {
                        const user = passportUser;
                        user.token = generateJWT(passportUser);

                        return res.send(toAuthJSON(user));
                    }

                    return res.status(400).send();
                })(req, res, next);
            }).catch(this.errorHandler(req, res));
    }

    @route('/current')
    @GET()
    @before([auth.required ])
    async getCurrentUser(req, res, next) {
        const { payload: { id } } = req;

        this.userService.getUserById({dataValues: {id}})
            .then(result => {
                res.send(toAuthJSON(result));
            }).catch(this.errorHandler(req, res));
    }

    @route('/logout')
    @GET()
    @before([auth.required ])
    async logout(req, res, next) {
        req.logout();
        res.send();
    }

    @route('/:id')
    @PUT()
    @before([bodyParser(), auth.required])
    async update(req, res, next) {
        let id = Number(req.params.id);
        if(!isNaN(id)){
            if(!req.body)
                res.status(400).send("Request body not found");
            else {
                let data = req.body;
                data.id = id;

                this.userModel.build(data).validate()
                    .then((model) => {
                        return this.userService.editUser(model)
                    }).then(result => {
                        res.send(result);
                    }).catch(this.errorHandler(req, res));
            }
        } else {
            res.status(404).send("User id is incorrect")
        }
    }

    @route('/:id')
    @DELETE()
    @before([auth.required])
    async remove(req, res, next) {
        let id = Number(req.params.id);
        if(!isNaN(id)){
            this.userService.deleteUser({dataValues: {id}})
                .then(result => {
                    res.send(result);
                }).catch(this.errorHandler(req, res));
        } else {
            res.status(404).send("User id is incorrect")
        }
    }
}

module.exports = UsersController;
