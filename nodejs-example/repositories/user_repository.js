import models from "../database";
import UserModel from "../models/user";
import UserError from "../errors/user-error";
import * as Sequelize from "sequelize";

export default class UserRepository {
    constructor({db}) {
        this.db = db;
    }

    async all(offset, limit) {
        let result = [];
        let queryResult = await this.db.Users.findAll({ offset, limit });
        queryResult.forEach((r, i) => result[i] = new UserModel(r.dataValues));
        return result;
    }

    async create(userModel) {
        let result = undefined;
        userModel.createdAt = userModel.updatedAt = new Date();
        return this.db.Users.create(userModel).then((query) => {
            result = query.dataValues;
            return result;
        }).catch((err) => {
            if (err instanceof Sequelize.ValidationError)
                return new UserError("User with same email already exists")
        });
    }

    async update(userModel) {
        let result = undefined;
        return this.db.Users.findByPk(userModel.id).then((user) => {
            if(user){
                let userDataOld = user.dataValues;
                let flagUpdated = false;
                let updateProperty = {};

                if(userModel.name && userModel.name !== userDataOld.name){
                    updateProperty.name = userModel.name;
                    flagUpdated = true;
                }
                if(userModel.status && userModel.status !== userDataOld.status){
                    updateProperty.status = userModel.status;
                    flagUpdated = true;
                }
                if(userModel.email && userModel.email !== userDataOld.email){
                    updateProperty.email = userModel.email;
                    flagUpdated = true;
                }

                if(flagUpdated){
                    updateProperty.updatedAt = new Date();
                    return user.update(updateProperty).then(query => {
                        return query.dataValues;
                    }).catch(err => {
                        if (err instanceof Sequelize.ValidationError)
                            throw new UserError("User with same email already exists");
                    });
                }
                return userDataOld;
            }
        }).catch(err => {
            return new UserError(err.message);
        });
    }

    async delete(userModel) {
        let deletedUser = undefined;
        return this.db.Users.findByPk(userModel.id).then(user =>{
            if(user) {
                deletedUser = user.dataValues;
                return user.destroy();
            }
            return 0;
        }).then(() => {
            return deletedUser;
        }).catch(err => {
            return new UserError(err.message)
        });
    }
}
