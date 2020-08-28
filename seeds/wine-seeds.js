const { Wine } = require('../models');

const wineData = [
    {
        name: "Pinot Grigio",
        bottle_size: "375 ml",
        price_paid: "15",
        notes: "Absolutely love this wine!",
        user_id: 3,
        imageurl:"https://s3.us-east-2.amazonaws.com/wineblogger.com/00f237157036e21c3f1b35c0fb6f0392"

    },
    {
        name: "Moscato d'Asti",
        bottle_size: "750 ml",
        price_paid: "12",
        notes: "Great taste. Sweet and full of flavor!",
        user_id: 5,
        imageurl:"https://s3.us-east-2.amazonaws.com/wineblogger.com/6cd5969cc2f45e2c0d13d736f778bdff"
    },
    {
        name: "Riesling",
        bottle_size: "375 ml",
        price_paid: "15",
        notes: "Very light and refreshing. Perfect for a hot summer evening!",
        user_id: 1,
        imageurl:"https://s3.us-east-2.amazonaws.com/wineblogger.com/4dfd288cb42ba2b45c32dbc865b40943"
    },
    {
        name: "Pinot Noir",
        bottle_size: "750 ml",
        price_paid: "13",
        notes: "This has a nice sweet, crisp taste to it!",
        user_id: 2,
        imageurl:"https://s3.us-east-2.amazonaws.com/wineblogger.com/800c2f2ea580546f4c9f380920447e43"
    },
    {
        name: "Apothic Red",
        bottle_size: "750 ml",
        price_paid: "11",
        notes: "Another go to bottle of red. Easy to find, inexpensive and delicious!",
        user_id: 4,
        imageurl:"https://s3.us-east-2.amazonaws.com/wineblogger.com/b8d3e682b5e7115e441189ccb1ac18c6"
    }
];

const seedWines = () => Wine.bulkCreate(wineData);

module.exports = seedWines;