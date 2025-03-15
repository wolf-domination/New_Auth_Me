



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















// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     // Create demo spots, etc.
//     await queryInterface.bulkInsert('Spots', [
//       {
//         ownerId: 1,  // example ownerId
//         address: '123 Main St',
//         city: 'San Francisco',
//         state: 'CA',
//         country: 'USA',
//         lat: 37.7749,
//         lng: -122.4194,
//         name: 'Demo Spot 1',
//         description: 'A cool spot!',
//         price: 100.00,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       // Add other spots as needed
//     ]);
//   },

//   down: async (queryInterface, Sequelize) => {
//     // Revert the seed (optional)
//     await queryInterface.bulkDelete('Spots', null, {});
//   }
// };









// backend/db/seeders/XXXXXXXXXXXXXX-demo-spots.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Set up options object for production environment (if needed)
    // Assuming you need to adjust the options depending on environment.
    const environment = process.env.NODE_ENV || 'development';
    const options = environment === 'production' ? { transaction: true } : {};

    // 2. Define up method:
    // - Find demo user (assuming you have a User model)
    const demoUser = await queryInterface.sequelize.models.User.findOne({
      where: { email: 'demo@user.com' }, // Replace with an actual email for the demo user
    });

    if (!demoUser) {
      console.log("Demo user not found, skipping spots seeding.");
      return;
    }

    
      'Spots', // Table name
      {
        "Spots": [
          {
            "id": 1,
            "ownerId": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "lat": 37.7645358,
            "lng": -122.4730327,
            "name": "App Academy",
            "description": "Place where web developers are created",
            "price": 123,
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36",
            "avgRating": 4.5,
            "previewImage": "image url"
          }
        ]
      }

    // 3. Create sample spot images
    await queryInterface.bulkInsert(
      'SpotImages', // Table name
      [
        // Preview and non-preview images for Spot 1
        {
          spotId: 1,
          imageUrl: 'https://example.com/preview1.jpg', // Replace with actual image URLs
          isPreview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          imageUrl: 'https://example.com/non-preview1.jpg',
          isPreview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Preview image for Spot 2
        {
          spotId: 2,
          imageUrl: 'https://example.com/preview2.jpg',
          isPreview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Preview image for Spot 3
        {
          spotId: 3,
          imageUrl: 'https://example.com/preview3.jpg',
          isPreview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      options
    );
  },

  down: async (queryInterface, Sequelize) => {
    // 3. Define down method:
    // - Delete all records from the SpotImages and Spots tables
    await queryInterface.bulkDelete('SpotImages', null, {});
    await queryInterface.bulkDelete('Spots', null, {});
  },
};
