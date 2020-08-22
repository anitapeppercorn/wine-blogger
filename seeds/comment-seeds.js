const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        wine_id: 5,
        comment_text: "Delicious, very nice wine for a tapas party. Crisp flavor.!"
    },
    {
        user_id: 4,
        wine_id: 4,
        comment_text: "Super sweet and bubbly. Fresh crisp fruity taste. Very light and refreshing!"
    },
    {
        user_id: 1,
        wine_id: 4,
        comment_text: "The best wine of the world! Easy to open, sweet, it’s like a desert!"
    },
    {
        user_id: 3,
        wine_id: 5,
        comment_text: "This is hands down my favorite wine ever. I love the taste, the packaging is gorgeous and it's relatively cheap!"
    },
    {
        user_id: 3,
        wine_id: 2,
        comment_text: "Tasty, sweet, refreshing and cheap. This is a great choice if you like a fruity wine....no dryness."
    },
    {
        user_id: 3,
        wine_id: 4,
        comment_text: "It's really crisp and sweet with notes of citrus and apricot. It's very pleasant and easy to drink wine that goes with pretty much anything"
    },
    {
        user_id: 5,
        wine_id: 3,
        comment_text: "Wonderful in the summer in a Sangria with fresh berries and a little fresh mint. So refreshing, reasonably priced!"
    },
    {
        user_id: 2,
        wine_id: 1,
        comment_text: "Best white wine. Taste great and crisp and sweet. Perfect blend of Fruits!"
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;