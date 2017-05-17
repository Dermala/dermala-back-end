const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const User = require('../models/User');
const Photo = require('../models/Photo');
const requiresAuth = require('../lib/requiresAuth');


router.route('/photo')
            .get(requiresAuth(), getAllPhotos)
            .post(requiresAuth(), addPhoto);
router.route('/photo/:id')
            .put(requiresAuth(), updatePhoto)
            .delete(requiresAuth(), deletePhoto);

module.exports = router;

/////////////////

function getAllPhotos(req, res, next) {
    Post
        .find()
        .exec()
        .then(photos => res.json(photos))
        .catch(next);
}

function addPhoto(req, res, next) {
    const newPhoto = new Photo(req.body)

    newPhoto.createdBy = req.user;
    newPhoto    
        .save()
        .then(photo => res.json(photo))
        .catch(next);
}

function deletePhoto(req, res, next) {
    Post
        .remove({ _id: req.params.id })
        .exec()
        .then((photo) => {
            if(photo.result.n === 1) {
                res.status(200).send();
            } else {
                res.status(404).send();
            }
        })
        .catch(next);
}