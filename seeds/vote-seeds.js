const { Vote } = require('../models');

const voteData = [
    {
        user_id: 1,
        wine_id: 1
    },
    {
        user_id: 3,
        wine_id: 1
    },
    {
        user_id: 5,
        wine_id: 5
    },
    {
        user_id: 5,
        wine_id: 4
    },
    {
        user_id: 4,
        wine_id: 4
    },
    {
        user_id: 4,
        wine_id: 5
    },
    {
        user_id: 2,
        wine_id: 5
    }
];

const seedVotes = () => Vote.bulkCreate(voteData);

module.exports = seedVotes;