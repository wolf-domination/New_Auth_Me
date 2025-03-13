


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


// const config = require('./index');

// module.exports = {
//   development: {
//     dialect: 'sqlite',
//     storage: config.dbFile || './db/development.sqlite3',  // Use correct database file
//     seederStorage: 'sequelize',
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


// const config = require('./index');

// module.exports = {
//   development: {
//     dialect: 'sqlite',
//     storage: config.dbFile || './db/development.sqlite3',  // Use correct database file
//     seederStorage: 'sequelize',
//     logQueryParameters: true,
//     typeValidation: true,
//   },
//   production: {
//     use_env_variable: 'DATABASE_URL',
//     dialect: 'postgres',
//     seederStorage: 'sequelize',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,  // Important for using SSL with PostgreSQL
//       },
//     },
//     define: {
//       schema: process.env.SCHEMA,  // Ensures use of specific schema if needed
//     },
//   },
//   test: {
//     dialect: 'sqlite',
//     storage: './db/test.sqlite3', // Separate test database
//     seederStorage: 'sequelize',
//   }
// };



const { Sequelize } = require('sequelize');
const config = require('./index');  // Your other config if needed

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite', // or 'postgres' in production
  storage: config.dbFile || './db/development.sqlite3',  // Use correct db path
  logging: false,  // Optional: Disable query logging if not needed
});

module.exports = sequelize;
