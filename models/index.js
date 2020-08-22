const User = require('./User');
const Wine = require('./wine');
const Comment = require('./Comment');
const Vote = require('./Vote');

User.hasMany(Wine, {
    foreignKey: 'user_id'
});

Wine.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Wine, {
    through: Vote,
    as: 'voted_wine',
    foreignKey: 'user_id'
});

Wine.belongsToMany(User, {
    through: Vote,
    as: 'voted_wine',
    foreignKey: 'wine_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Wine, {
    foreignKey: 'wine_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Wine.hasMany(Vote, {
    foreignKey: 'wine_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Wine, {
    foreignKey: 'wine_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Wine.hasMany(Comment, {
    foreignKey: 'wine_id'
});

module.exports = {User, Wine, Vote, Comment};