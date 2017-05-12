const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const _ = require('lodash');

module.exports = function initializePassport(passport) {
    function getUserFromJWT(jwtPayload, done) {
        User
            .findById(jwtPayload.sub)
            .exec()
            .then(user => {
                console.log(user.email);
                done(null, user)
            })
            .catch(err => done(err));
    }

    const strategy = new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: process.env.AUTHKEY,
    }, getUserFromJWT);
    
    passport.use(strategy);
};