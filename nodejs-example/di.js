import {asClass, asValue, createContainer, InjectionMode} from 'awilix'
import {loadControllers, scopePerRequest} from "awilix-express";
import UserService from "./services/user_service";
import models from "./database";
import UserRepository from "./repositories/user_repository";

export default (app) => {
    const container = createContainer({
        injectionMode: InjectionMode.PROXY
    }).register({
        userRepository: asClass(UserRepository).singleton(),
        userService: asClass(UserService).singleton(),
        db: asValue(models)
    });

    app.use(scopePerRequest(container));
    app.use('/api/v1', loadControllers(`${__dirname}/controllers/api/*.js`, { cwd: __dirname }));
}
