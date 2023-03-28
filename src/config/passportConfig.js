import passport from "passport";
import local from 'passport-local';

import userModel from "../dao/mongo/user.js";
import { validatePassword } from "../services/pwdencrypt.js";

const LocalStrategy = local.Strategy;

const initializePassport = () =>{
    passport.use('login', new LocalStrategy({usernameField:'email'}, async (email, password, done) => {
        const user = await userModel.findOne({email});
        !user && done(null, false, {message: 'User does not exist'})
        const isValidPassword = await validatePassword(password, user.password);
        !isValidPassword && done(null, false, {message: 'Wrong password'});
        return done(null, user);
    }))
}

export default initializePassport;