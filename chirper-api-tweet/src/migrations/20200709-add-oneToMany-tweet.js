module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'CommentItems', // name of Source model
        'tweetId', // name of the key we're adding 
        {
          type: Sequelize.UUID,
          references: {
            model: 'TweetItems', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'CommentItems', // name of Source model
        'tweetId' // key we want to remove
      );
    }
  };