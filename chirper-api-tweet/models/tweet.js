'use strict';

module.exports = (sequelize, DataTypes) => {
  const TweetItem = sequelize.define('TweetItem', {
    id: {
        allowNull: false,
        autoIncrement: true,
        
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
  })
  return TweetItem
}
