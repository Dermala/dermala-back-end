const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const User = require('../models/User');
const Photo = require('../models/Photo');
const requiresAuth = require('../lib/requiresAuth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', requiresAuth(), getProfile);

module.exports = router;

///////////////
function register(req, res, next) {
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
        res.status(400).json({ errors: ['Please enter all required fields']});
    } else {
        const newUser = new User({
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });

        newUser
            .save()
            .then(() => res.json({ message: 'Successfully registered new user'}))
            .catch(err => {
                if(err.code && err.code === 11000) {
                    res.status(400).send({ 'errors': ['Email already registered'] });
                } else {
                    next(err);
                }
            });
    }
}

function login(req, res, next) {
    let promiseA = User.findOne({ email: req.body.email }).exec();
    let promiseB = promiseA.then(user => user.comparePassword(req.body.password));
    
    Promise
        .all([
            promiseA,
            promiseB
        ])
        .then(([user, isMatch]) => {
            if(isMatch) {
                res.json({
                    token: jwt.sign({
                        sub: user._id
                    }, process.env.AUTHKEY, { expiresIn: '365 days' })
                });
            } else {
                res.status(400).json({
                    errors: ['Email or password incorrect']
                });
            }
        })
        .catch(next);
}
function getProfile(req, res, next) {
    Post
        .find({ createdBy: req.user._id })
        .exec()
        .then(posts => {
            res.json({
                user: req.user,
                posts
            });
        })
        .catch(next);
}