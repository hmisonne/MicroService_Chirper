'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TweetItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      author:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      replies:{
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      likes:{
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      replyingTo:{
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TweetItems');
  },
};