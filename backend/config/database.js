


// // backend/config/database.js
// const config = require('./index');

// module.exports = {
//   development: {
//     storage: config.dbFile,
//     dialect: "sqlite",
//     seederStorage: "sequelize",
//     logQueryParameters: true,
//     typeValidation: true
//   },
//   production: {
//     use_env_variable: 'DATABASE_URL',
//     dialect: 'postgres',
//     seederStorage: 'sequelize',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     },
//     define: {
//       schema: process.env.SCHEMA
//     }
//   }
// };

// //New stuff below.
// module.exports = {
//   development: {
//     dialect: 'sqlite',
//     storage: './db/dev.db',
//   },
//   // other environments (production, test)...
// };


const config = require('./index');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: config.dbFile || './db/development.sqlite3',  // Use correct database file
    seederStorage: 'sequelize',
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};

