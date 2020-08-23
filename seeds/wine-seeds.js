const { Wine } = require('../models');

const wineData = [
    {
        name: "Pinot Grigio",
        bottle_size: "375 ml",
        price_paid: "15",
        notes: "Absolutely love this wine!",
        user_id: 3
    },
    {
        name: "Moscato d'Asti",
        bottle_size: "750 ml",
        price_paid: "12",
        notes: "Great taste. Sweet and full of flavor!",
        user_id: 5
    },
    {
        name: "Riesling",
        bottle_size: "375 ml",
        price_paid: "15",
        notes: "Very light and refreshing. Perfect for a hot summer evening!",
        user_id: 1
    },
    {
        name: "Pinot Noir",
        bottle_size: "750 ml",
        price_paid: "13",
        notes: "This has a nice sweet, crisp taste to it!",
        user_id: 2
    },
    {
        name: "Apothic Red",
        bottle_size: "750 ml",
        price_paid: "11",
        notes: "Another go to bottle of red. Easy to find, inexpensive and delicious!",
        user_id: 4
    }
];

const seedWines = () => Wine.bulkCreate(wineData);

module.exports = seedWines;