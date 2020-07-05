'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TweetItems', [{
      id: "98f9331d-459d-4f13-8d6a-4be5528bf423",
      text: "Hello, this is my first Tweet",
      author: "Angela123",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "46ab8e66-f3a4-48ae-a9e4-040ca0b29186",
      text: "Welcome Angela!",
      author: "Bob44",
      replyingTo: "98f9331d-459d-4f13-8d6a-4be5528bf423",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "46ab8e66-f3a4-48ae-a9e4-040ca0b29185",
      text: "Do you like to code?",
      author: "Fab66",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TweetItems', null, {});
  }
};