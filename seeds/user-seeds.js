const { User } = require('../models');

const userData = [
    {
        username: "martin_b",
        email: "martin_b@gmail.com",
        password: "p@ssword1"
    },
    {
        username: "matt_b",
        email: "mathew_b@gmail.com",
        password: "p@ssword2"
    },
    {
        username: "shaun_c",
        email: "shaun_c@gmail.com",
        password: "p@ssword3"
    },
    {
        username: "lee_n",
        email: "lee_n@gmail.com",
        password: "p@ssword4"
    },
    {
        username: "priya_r",
        email: "priya_r@gmail.com",
        password: "p@ssword5"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;