export default class UserModel {
    constructor(opt){
        if(opt instanceof Object){
            this.id = opt.id | undefined;
            this.name = opt.name;
            this.status = opt.status;
            this.email = opt.email;
            this.createdAt = opt.createdAt | undefined;
            this.updatedAt = opt.updatedAt | undefined;
        }
    }
}
