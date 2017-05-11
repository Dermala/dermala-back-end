const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const User = require('../models/customer');
const Post = require('../models/post');
const requiresAuth = require('../lib/requiresAuth');


router.get('/:id', function(req, res){
    //connect to mongodb
    //run a query
    //respond with data
});

router.post('/', function(req, res){

});

router.put('/:id', function(req, res){

});

router.delete('/:id', function(req, res){

});

module.exports = router;