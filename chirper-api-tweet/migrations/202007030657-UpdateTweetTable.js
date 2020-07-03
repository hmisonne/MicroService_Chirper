module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('TweetItem', 'author', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('TweetItem', 'likes', {
          type: Sequelize.DataTypes.ARRAY(Sequelize.STRING),
        }, { transaction: t }),
        queryInterface.addColumn('TweetItem', 'replies', {
          type: Sequelize.DataTypes.ARRAY(Sequelize.STRING),
        }, { transaction: t }),
        queryInterface.addColumn('TweetItem', 'replyingTo', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('TweetItem', 'author', { transaction: t }),
        queryInterface.removeColumn('TweetItem', 'likes', { transaction: t }),
        queryInterface.removeColumn('TweetItem', 'replies', { transaction: t }),
        queryInterface.removeColumn('TweetItem', 'replyingTo', { transaction: t })
      ]);
    });
  }
};
