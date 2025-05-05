'use strict';
const options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    // (Assumes the above reviews have been seeded and got IDs 1–4)
    await queryInterface.bulkInsert(
      'ReviewImages',
      [
        // For Review #1
        {
          reviewId: 13,
          url: 'https://example.com/review1-preview.jpg',
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // For Review #2
        {
          reviewId: 14,
          url: 'https://example.com/review2-preview.jpg',
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // For Review #3
        {
          reviewId: 15,
          url: 'https://example.com/review3-preview.jpg',
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // For Review #4
        {
          reviewId: 16,
          url: 'https://example.com/review4-preview.jpg',
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', null, options);
  }
};