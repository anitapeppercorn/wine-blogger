const router = require('express').Router();
const sequelize = require('../config/connection');
const { Wine, User, Vote, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all wines for /inventory
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Wine.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'bottle_size',
            'price_paid',
            'notes',
            'imageurl',
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
            }
        ]
    })
        .then(dbWineData => {
            const wines = dbWineData.map(wine => wine.get({ plain: true }));
            res.render('inventory', {wines, loggedIn: true});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get wine by ID
router.get('/wine/:id', (req, res) => {
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
            'imageurl',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'wine_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
        .then(dbWineData => {
            if (!dbWineData) {
                res.status(404).json({ message: 'No wine found with this id' });
                return;
            }

            const wine = dbWineData.get({ plain: true });
            console.log("wine /nvb-routes", "wine")
            console.log("session id", req.session.username)
            let isUsers = wine.user.username == req.session.username

            res.render('single-wine', {
                wine,
                loggedIn: req.session.loggedIn,
                showDelete: isUsers
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/wine/:id', withAuth, (req, res) => {
    if (req.session) {
        Wine.update(
            {
              title: req.body.title
            },
            {
              where: {
                id: req.params.id
              }
            }
          )
            .then(updatedVoteData => res.json(updatedVoteData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;