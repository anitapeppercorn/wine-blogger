const router = require('express').Router();

const userRoutes = require('./user-routes');
const wineRoutes = require('./wine-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/wine', wineRoutes);

module.exports = router;