import UserError from "../errors/user-error";

export default class UserService {
    constructor({userRepository}){
        this.userRepository = userRepository;
    }

    async getAll({offset, limit}){
        return this.userRepository.all(offset, limit);
    }

    async getUserByEmail(userModel){
        return this.userRepository.findByEmail(userModel.dataValues);
    }

    async getUserById(userModel){
        return this.userRepository.findById(userModel.dataValues);
    }

    async addUser(userModel){
        return this.userRepository.create(userModel.dataValues);
    }

    async editUser(userModel) {
        return this.userRepository.update(userModel.dataValues);
    }

    async deleteUser(userModel){
        return this.userRepository.delete(userModel.dataValues)
    }
}
