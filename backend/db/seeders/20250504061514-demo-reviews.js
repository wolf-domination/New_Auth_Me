const options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    // find demo user
    const [[{ id: demoUserId }]] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'demo@user.io';`
    );

    await queryInterface.bulkInsert(
      'Reviews',
     [
        {
          userId: demoUserId,
          spotId: 1,
          review: 'Amazing beachside location! The view was breathtaking and the place was spotless.',
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: demoUserId,
          spotId: 1,
          review: 'Great amenities and friendly host. Would definitely stay again.',
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: demoUserId,
          spotId: 2,
          review: 'Perfect downtown spot—close to everything. Super cozy and quiet.',
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: demoUserId,
          spotId: 2,
          review: 'Nice apartment, but the street was a bit noisy at night.',
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, options);
  }
};