const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const User = require('../models/customer');
const Post = require('../models/post');
const requiresAuth = require('../lib/requiresAuth');


router.get('/', function(req, res){
    
});

router.get('/:id', function(req, res){

});

router.post('/', function(req, res){

});

router.put('/:id', function(req, res){

});

router.delete('/:id', function(req, res){

});

module.exports = router;