import models from "../database";
import UserError from "../errors/user-error";
import * as Sequelize from "sequelize";
import ServerError from "../errors/server-error";

export default class UserRepository {
    constructor({db}) {
        this.db = db;
    }

    async all(offset, limit) {
        return this.db.Users.findAll({ offset, limit })
            .then(result => {
                return result.map(data => data.dataValues);
            }).catch(err => {
                throw new ServerError(err)
            });
    }

    async create(userModel) {
        return this.db.Users.create(userModel).then((query) => {
            return query.dataValues;
        }).catch((err) => {
            if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.UniqueConstraintError) {
                let errorMessage = err.errors.map(e => e.message).join('\n');
                throw new UserError(errorMessage);
            }
            if(err instanceof Sequelize.DatabaseError) {
                if(err.message === "invalid input value for enum enum_users_type: \"t\"")
                    throw new UserError("invalid user type");
            }
            throw new ServerError(err)
        });
    }

    async update(userModel) {
        let result = undefined;
        return this.db.Users.findByPk(userModel.id).then((user) => {
            if(user){
                return user.update(userModel).then(query => {
                    return query.dataValues;
                }).catch(err => {
                    if (err instanceof Sequelize.ValidationError)
                        throw new UserError("User with same email already exists");
                });
            }
        }).catch(err => {
            throw new ServerError(err);
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
            throw new ServerError(err.message)
        });
    }
}
