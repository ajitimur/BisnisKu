'use strict';
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = JSON.parse(fs.readFileSync(`./database/baseAccount.json`, `utf-8`))
     const dataMapped = data.map(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
       return el
     })
     await queryInterface.bulkInsert('Accounts', dataMapped, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Accounts', null, {});
  }
};
