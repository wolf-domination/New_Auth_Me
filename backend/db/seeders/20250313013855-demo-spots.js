'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const options = process.env.NODE_ENV === 'production' ? { schema: process.env.SCHEMA } : {};

    // Find demo user ID using raw SQL
    const demoUserId = await queryInterface.rawSelect(
      'Users', // Table name
      { where: { email: 'demo@user.io' } }, // Find demo user by email
      ['id'] // Only select the ID column
    );

    if (!demoUserId) {
      console.log("Demo user not found, skipping spots seeding.");
      return;
    }

    // Insert sample spots
    await queryInterface.bulkInsert(
      'Spots',
      [
        {
          ownerId: demoUserId,
          address: '123 Disney Lane',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 37.7645358,
          lng: -122.4730327,
          name: 'App Academy',
          description: 'Place where web developers are created',
          price: 123,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: demoUserId,
          address: '456 Sunset Blvd',
          city: 'Los Angeles',
          state: 'California',
          country: 'United States of America',
          lat: 34.0522,
          lng: -118.2437,
          name: 'Sunny Retreat',
          description: 'Beautiful beachside getaway',
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: demoUserId,
          address: '789 Mountain Rd',
          city: 'Denver',
          state: 'Colorado',
          country: 'United States of America',
          lat: 39.7392,
          lng: -104.9903,
          name: 'Mountain View',
          description: 'Breathtaking views of the Rockies',
          price: 175,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      options
    );

    // Fetch inserted spot IDs (workaround for missing "returning" in SQLite)
    const spots = await queryInterface.sequelize.query(
      'SELECT id FROM "Spots" WHERE "ownerId" = :ownerId',
      {
        replacements: { ownerId: demoUserId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (!spots.length) {
      console.log("No spots were inserted, skipping spot images.");
      return;
    }

    // Map spot IDs dynamically
    const [spot1, spot2, spot3] = spots;

    // Insert sample spot images
    await queryInterface.bulkInsert(
      'SpotImages',
      [
        { spotId: spot1.id, url: 'https://example.com/preview1.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() },
        { spotId: spot1.id, url: 'https://example.com/non-preview1.jpg', preview: false, createdAt: new Date(), updatedAt: new Date() },
        { spotId: spot2.id, url: 'https://example.com/preview2.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() },
        { spotId: spot3.id, url: 'https://example.com/preview3.jpg', preview: true, createdAt: new Date(), updatedAt: new Date() },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
    await queryInterface.bulkDelete('Spots', null, {});
  },
};
