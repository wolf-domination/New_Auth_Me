'use strict';
const options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    // find demo user
    const [[{ id: demoUserId }]] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE email = 'demo@user.io';`
    );

    // insert sample bookings (spots 1–3 must already exist)
    await queryInterface.bulkInsert(
      'Bookings',
      [
        {
          spotId: 7,
          userId: demoUserId,
          startDate: '2025-05-01',
          endDate: '2025-05-07',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 8,
          userId: demoUserId,
          startDate: '2025-06-15',
          endDate: '2025-06-20',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 9,
          userId: demoUserId,
          startDate: '2025-07-10',
          endDate: '2025-07-15',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, options);
  }
};