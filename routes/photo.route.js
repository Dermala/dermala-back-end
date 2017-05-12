const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const User = require('../models/customer');
const Post = require('../models/post');
const requiresAuth = require('../lib/requiresAuth');


router.route('/')
            .get(requiresAuth(), getAllPhotos)
            .post(requiresAuth(), addPhoto);
router.route('/:id')
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
    const newPhoto = new Photo({
        imageUrl: { type: String, required: true },
        createdBy: { type: Schema.Types.objectId, ref: 'User' },
        postDate: { type: Schema.Types.objectId, ref: 'Date' },
    })
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