'use strict';


module.exports = (sequelize, DataTypes) => {
  const emptyArray = [];
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
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: emptyArray
      },
       replies: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: emptyArray
      },
      replyingTo: {
        allowNull: true,
        type: DataTypes.STRING,
      },
  })
  return TweetItem
}