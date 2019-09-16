import {before, GET, route} from "awilix-router-core";
import auth from "../auth";
import Sequelize from "sequelize";
import {UserTypes} from "../../database/dto/user";

@route('/users')
export default class UsersViewController {
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
    @before([])
    async getAll(req, res, next) {
        let offset = req.query.offset | 0;
        let limit = req.query.limit | 20;
        this.userService.getAll({offset, limit})
            .then(result => {
                res.render('users',{
                    layout: 'container',
                    container : {
                        title: 'User List'
                    },
                    users: result,
                    usersType: Object.values(UserTypes)
                });
            })
            .catch(this.errorHandler(req, res));
    }
}
