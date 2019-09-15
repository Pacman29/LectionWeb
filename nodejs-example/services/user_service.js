import UserError from "../errors/user-error";

export default class UserService {
    constructor({userRepository}){
        this.userRepository = userRepository;
    }

    async getAll({offset, limit}){
        let result = undefined;
        try {
            result = await this.userRepository.all(offset, limit);
        } catch (e) {
            if(e instanceof Error)
                result = e;
        }
        return result;
    }

    async addUser(userModel){
        let result = undefined;
        try {
            result = await this.userRepository.create(userModel);
        } catch (e) {
            if(e instanceof UserError)
                result = e;
        }
        return result;
    }

    async editUser(userModel) {
        let result = undefined;
        try {
            result = await this.userRepository.update(userModel);
        } catch (e) {
            if(e instanceof UserError)
                result = e;
        }
        return result;
    }

    async deleteUser(userModel){
        let result = {};
        try {
            result = await this.userRepository.delete(userModel);
        } catch (e) {
            if(e instanceof Error)
                result = e;
        }
        return result;
    }
}
