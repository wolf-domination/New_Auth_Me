'use strict';
const options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    // find demo user
    const [[{ id: demoUserId }]] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'demo@user.io';`
    );

    // insert sample reviews (spots 1–3 must already exist)
    await queryInterface.bulkInsert(
      'Reviews',
      [
        {
          userId: demoUserId,
          spotId: 7,
          review: 'Amazing experience at App Academy!',
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: demoUserId,
          spotId: 7,
          review: 'Great atmosphere and very inspiring.',
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: demoUserId,
          spotId: 8,
          review: 'Sunny Retreat lived up to its name!',
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: demoUserId,
          spotId: 8,
          review: 'Breathtaking mountain views and cozy lodging.',
          stars: 4,
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