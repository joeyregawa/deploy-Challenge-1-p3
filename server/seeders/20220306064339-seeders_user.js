'use strict';
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert("Users", [{
        "username": "Arv",
        "email": "arv@a.com",
        "password": hashPassword("12345"),
        "role": "Admin",
        "phoneNumber": "08138723494",
        "address": "4750 Corscot Road",
        createdAt: new Date(),
        updatedAt: new Date(),
     }]
     ,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
