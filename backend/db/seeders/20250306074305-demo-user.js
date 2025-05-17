
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Users';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'Lition',
        username: 'Demo-lition',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     {
        firstName: 'Bob',
        lastName: 'Builder',
        email: 'bob@builder.com',
        username: 'BobBuilder',
        hashedPassword: bcrypt.hashSync('bobpass'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie@brown.com',
        username: 'CharlieBrown',
        hashedPassword: bcrypt.hashSync('charliepass'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ['Demo-lition', 'BobBuilder', 'CharlieBrown'],
      },
    }, {});
  },
};