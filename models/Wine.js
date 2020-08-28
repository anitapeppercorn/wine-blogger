const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { truncate } = require('./User');

// create our Post model
class Wine extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            wine_id: body.wine_id
        }).then(() => {
            return Wine.findOne({
                where: {
                    id: body.wine_id
                },
                attributes: [
                    'id',
                    'name',
                    'bottle_size',
                    'price_paid',
                    'user_id',
                    'imageurl',
                    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)'), 'vote_count']
                ]
            });
        });
    }
}

// create fields/columns for Post model
Wine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bottle_size: {
            type: DataTypes.TEXT,
            allowNull: truncate
        },
        price_paid: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
            
        },
        imageurl: {
            type: DataTypes.STRING,
            defaultValue: 'https://s3.us-east-2.amazonaws.com/wineblogger.com/246f9439e7b28bc9abeb9fc6a4275b47',
            allowNull: true
        }
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'wine'
    }
);

module.exports = Wine;