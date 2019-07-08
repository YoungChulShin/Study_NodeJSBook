var express = require('express');
var { User, Comment } = require('../models');

var router = express.Router();
router.get('/:id', function(req, res, next) {
    Comment.findAll({
        include: {
            model: User,
            where: { id: req.param.id }
        }
    })
    .then((comments) => {
        console.log(comments);
        res.json(comments);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});

router.post('/', async(req, res, next) => {
    try {
        const result = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment
        });

        console.log(result);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.patch('/:id', async(req, res, next) => {
    try {
        const result = await Comment.update(
            { comment: req.body.comment },
            { where: { id: req.body.id }}
        );

        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const result = await Comment.destroy(
            { where: { id: req.body.id }}
        );

        res.json(result);
    } catch (err) {
        console.err(err);
        next(err);
    }
});

module.exports = router;