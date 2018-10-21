import models from "../database";

let init;
export default class UserService {
    constructor(){
        if(init)
            return init;
        init = this;
    }

    async getAll(){
        let result = [];
        try {
            result = await models.Users.findAll();
            result = result.map(obj => obj.dataValues)
        } catch (e) {
            console.error(e);
        }
        return result;
    }

    async addUser(name,status,email){
        let result = undefined;
        try {
            result = await models.Users.create(
                {
                    name,
                    status,
                    email
                }
            );
            result = result.dataValues;
        } catch (e) {
            console.error(e);
        }
        return result;
    }
}