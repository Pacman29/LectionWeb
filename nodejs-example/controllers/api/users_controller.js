import {route, GET, POST, PUT, DELETE, before} from "awilix-express";
import bodyParser from 'body-parser'
import UserModel from "../../models/user";

@route('/users')
class UsersController {

    constructor({userService}){
        this.userService = userService;
    }

    @route('/')
    @GET()
    async getAll(req, res, next) {
        let offset = req.query.offset | 0;
        let limit = req.query.limit | 20;
        let result = await this.userService.getAll({offset, limit});
        // res.render('users',{
        //     layout: 'container',
        //     container : {
        //         title: 'User List'
        //     },
        //     users
        // });
        if(!result)
            res.status(400).send();
        else if (result instanceof Error)
            res.status(400).send(result.message);
        else
            res.send(result);
    }

    @route('/')
    @POST()
    @before([bodyParser()])
    async create(req, res, next) {
        if(!req.body)
            res.status(400).send("Request body not found");
        let result = await this.userService.addUser(new UserModel(req.body));
        if(!result)
            res.status(400).send();
        else if (result instanceof Error)
            res.status(400).send(result.message);
        else
            res.send(result);
        //res.redirect('/users');
    }

    @route('/:id')
    @PUT()
    @before([bodyParser()])
    async update(req, res, next) {
        let id = Number(req.params.id);
        if(!isNaN(id)){
            if(!req.body)
                res.status(400).send("Request body not found");
            else {
                let data = req.body;
                data.id = id;
                let result = await this.userService.editUser(new UserModel(data));
                if(!result)
                    res.status(400).send();
                else if (result instanceof Error)
                    res.status(400).send(result.message);
                else
                    res.send(result);
            }
        } else {
            res.status(404).send("User id is incorrect")
        }
    }

    @route('/:id')
    @DELETE()
    async remove(req, res, next) {
        let id = Number(req.params.id);
        if(!isNaN(id)){
            let result = await this.userService.deleteUser(new UserModel({id}));
            if(!result)
                res.status(400).send();
            else if (result instanceof Error)
                res.status(400).send(result.message);
            else
                res.send(result);
        } else {
            res.status(404).send("User id is incorrect")
        }
    }
}

module.exports = UsersController;
