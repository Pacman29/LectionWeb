import passport from "passport";
import LocalStrategy from "passport-local";
import {validatePassword} from "./database/dto/user";

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {

    global.DI.cradle.userRepository.findByEmail({email})
        .then((user) => {
            if(!user || !validatePassword(user, password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }
            return done(null, user);
        }).catch(done);
}));
