module.exports = {
  async up(queryInterface, Sequelize) {
    const options = process.env.NODE_ENV === 'production' ? { schema: process.env.SCHEMA } : {};

    // Retrieve the demo user's ID
    const demoUserId = await queryInterface.rawSelect(
      'Users',
      { where: { email: 'demo@user.io' } },
      ['id']
    );

    if (!demoUserId) {
      console.log("Demo user not found, skipping spot seeding.");
      return;
    }

    // Insert new sample spots with different data
    await queryInterface.bulkInsert(
      'Spots',
      [
       {
          ownerId: demoUserId,
          address: '123 Palm Tree Lane',
          city: 'Miami',
          state: 'Florida',
          country: 'USA',
          lat: 25.7617,
          lng: -80.1918,
          name: 'Beachside Paradise',
          description: 'Sunny condo steps from the ocean.',
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: demoUserId,
          address: '456 Maple Street',
          city: 'Portland',
          state: 'Oregon',
          country: 'USA',
          lat: 45.5051,
          lng: -122.6750,
          name: 'Urban Hideaway',
          description: 'Cozy apartment in downtown Portland.',
          price: 180,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: demoUserId,
          address: '789 Desert Road',
          city: 'Phoenix',
          state: 'Arizona',
          country: 'USA',
          lat: 33.4484,
          lng: -112.0740,
          name: 'Desert Oasis',
          description: 'Modern home with a private pool.',
          price: 250,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      options
    );

    // Get the IDs of the inserted spots
    const spots = await queryInterface.sequelize.query(
      'SELECT id FROM "Spots" WHERE "ownerId" = :ownerId',
      {
        replacements: { ownerId: demoUserId },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (!spots.length) {
      console.log("No spots inserted, skipping spot images.");
      return;
    }

    // Assign spot IDs
    const [spotA, spotB, spotC] = spots;

    // Insert new sample spot images with different data
    await queryInterface.bulkInsert(
      'SpotImages',
      [
        {
          spotId: spotA.id,
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Colorado mountains
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: spotA.id,
          url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80', // Rocky Mountains
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: spotB.id,
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Lake view
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: spotC.id,
          url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', // Austin city
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
    await queryInterface.bulkDelete('Spots', null, {});
  },
};