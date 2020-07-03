'use strict';

module.exports = (sequelize, DataTypes) => {
  const TweetItem = sequelize.define('TweetItem', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING,
      },
       author: {
        allowNull: false,
        type: DataTypes.STRING,
      },
       likes: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
       replies: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      replyingTo: {
        allowNull: true,
        type: DataTypes.STRING,
      },
  })
  return TweetItem
}