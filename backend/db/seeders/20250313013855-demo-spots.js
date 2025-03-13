



// // backend/db/seeders/XXXXXXXXXXXXXX-demo-spots.js
// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     // Find demo user
//     const demoUser = await queryInterface.sequelize.query(
//       `SELECT id FROM "Users" WHERE username = 'demoUser' LIMIT 1;`,
//       { type: Sequelize.QueryTypes.SELECT }
//     );

//     if (!demoUser || demoUser.length === 0) {
//       console.log('Demo user not found');
//       return;
//     }

//     const userId = demoUser[0].id;

//     // Create sample spots
//     const spots = await queryInterface.bulkInsert(
//       'Spots', 
//       [
//         {
//           ownerId: userId,
//           address: '123 App Academy Blvd',
//           city: 'San Francisco',
//           state: 'CA',
//           country: 'USA',
//           lat: 37.7833,
//           lng: -122.4167,
//           name: 'App Academy',
//           description: 'A premier coding bootcamp in San Francisco.',
//           price: 200,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           ownerId: userId,
//           address: '456 Sunny St',
//           city: 'Los Angeles',
//           state: 'CA',
//           country: 'USA',
//           lat: 34.0522,
//           lng: -118.2437,
//           name: 'Sunny Retreat',
//           description: 'A peaceful retreat for relaxation in Los Angeles.',
//           price: 150,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           ownerId: userId,
//           address: '789 Mountain View Dr',
//           city: 'Denver',
//           state: 'CO',
//           country: 'USA',
//           lat: 39.7392,
//           lng: -104.9903,
//           name: 'Mountain View',
//           description: 'A beautiful view of the mountains in Denver.',
//           price: 180,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       { returning: true }
//     );

//     // Create sample spot images
//     await queryInterface.bulkInsert(
//       'SpotImages',
//       [
//         {
//           spotId: spots[0].id,
//           url: 'https://example.com/app-academy-image1.jpg',
//           preview: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           spotId: spots[0].id,
//           url: 'https://example.com/app-academy-image2.jpg',
//           preview: false,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           spotId: spots[1].id,
//           url: 'https://example.com/sunny-retreat-image1.jpg',
//           preview: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           spotId: spots[2].id,
//           url: 'https://example.com/mountain-view-image1.jpg',
//           preview: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ],
//       {}
//     );
//   },

//   down: async (queryInterface, Sequelize) => {
//     // Delete all records from Spots and SpotImages tables
//     await queryInterface.bulkDelete('SpotImages', null, {});
//     await queryInterface.bulkDelete('Spots', null, {});
//   },
// };




'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create demo spots, etc.
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,  // example ownerId
        address: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Demo Spot 1',
        description: 'A cool spot!',
        price: 100.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add other spots as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the seed (optional)
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
