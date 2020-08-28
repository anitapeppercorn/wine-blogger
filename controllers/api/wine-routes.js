const router = require('express').Router();
const { User, Wine, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const awsSDK = require('aws-sdk');
const multer = require('multer');
const { response } = require('express');
var upload = multer({ dest: 'uploads/' });
let fs = require('fs');
// Get all wine posts
router.get('/', (req, res) => {
    Wine.findAll({
        attributes: [
            'id',
            'name',
            'bottle_size',
            'price_paid',
            'notes',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'wine_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
        .then(dbWineData => res.json(dbWineData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single wine post
router.get('/:id', (req, res) => {
    Wine.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'bottle_size',
            'price_paid',
            'notes',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'wine_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]

    })
        .then(dbWineData => {
            if (!dbWineData) {
                res.status(404).json({ message: 'No wine found with this id' });
                return;
            }
            res.json(dbWineData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a wine post
router.post('/', withAuth, (req, res) => {
    Wine.create({
        name: req.body.name,
        bottle_size: req.body.bottle_size,
        price_paid: req.body.price_paid,
        notes: req.body.notes,
        user_id: req.session.user_id
    })
        .then(dbWineData => res.json(dbWineData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//wine voting route
router.put('/upvote', withAuth, (req, res) => {
    if (req.session) {
        Wine.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
            .then(updatedVoteData => res.json(updatedVoteData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// Delete wines
router.delete('/:id', withAuth, (req, res) => {
    Wine.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbWineData => {
            if (!dbWineData) {
                res.status(404).json({ message: 'No wine found with this id' });
                return;
            }
            res.json(dbWineData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/file', withAuth, upload.single('image'), (req, res) => {
    console.log("image", req.file)
    console.log(process.env)
    awsSDK.config.update({
        accessKeyId: process.env.aws_accesskey,
        secretAccessKey: process.env.aws_secretkey
    })
    const s3 = new awsSDK.S3();
    fs.readFile(`uploads/${req.file.filename}`, function (er, d) {
        
        s3.putObject({
            Bucket: 'wineblogger.com',
            Key: req.file.filename,
            Body: d
        }, function (err, data) {
            if (err) {
                console.log("There was an error: ", err);
                return res.status(500).send({
                    success: false,
                    message: 'Error saving fil to aws',
                    error: err
                })
            }
            res.status(200).send({
                message: 'File uplioad to aws',
                data: data,
                file: req.file
            })
        })
    })
    /*res.status(200).send({
        message: "Gonna save the image to aws",
        file: req.file ? req.file : "There was no file"
    })*/
});

module.exports = router;