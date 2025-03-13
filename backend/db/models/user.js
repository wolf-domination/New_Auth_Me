


// 'use strict';

// const { Model, Validator } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     static associate(models) {
//       // define association here
//     }
//   }

//   User.init(
//     {
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           len: [4, 30],
//           isNotEmail(value) {
//             if (Validator.isEmail(value)) {
//               throw new Error('Cannot be an email.');
//             }
//           },
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           len: [3, 256],
//           isEmail: true,
//         },
//       },
//       hashedPassword: {
//         type: DataTypes.STRING.BINARY,
//         allowNull: false,
//         validate: {
//           len: [60, 60],
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: 'User',
//       defaultScope: {
//         attributes: {
//           exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
//         },
//       },
//     }
//   );
//   return User;
// };


// // backend/utils/auth.js
// // ...

// // Sends a JWT Cookie
// const setTokenCookie = (res, user) => {
//   // Create the token.
//   const safeUser = {
//     id: user.id,
//     email: user.email,
//     username: user.username,
//   };
//   const token = jwt.sign(
//     { data: safeUser },
//     secret,
//     { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
//   );

//   const isProduction = process.env.NODE_ENV === "production";

//   // Set the token cookie
//   res.cookie('token', token, {
//     maxAge: expiresIn * 1000, // maxAge in milliseconds
//     httpOnly: true,
//     secure: isProduction,
//     sameSite: isProduction && "Lax"
//   });

//   return token;
// };




'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true });
      User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
      User.hasMany(models.Booking, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    }
  }

  User.init(
    {
      // username: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   unique: true,
      //   validate: {
      //     len: [4, 30],
      //     isNotEmail(value) {
      //       if (Validator.isEmail(value)) {
      //         throw new Error('Cannot be an email.');
      //       }
      //     },
      //   },
      // },
      // email: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   unique: true,
      //   validate: {
      //     len: [3, 256],
      //     isEmail: true,
      //   },
      // },
      // hashedPassword: {
      //   type: DataTypes.STRING.BINARY,
      //   allowNull: false,
      //   validate: {
      //     len: [60, 60],
      //   },
      // },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'First name is required' },
          notEmpty: { msg: 'First name cannot be empty' },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Last name is required' },
          notEmpty: { msg: 'Last name cannot be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Email is required' },
          isEmail: { msg: 'Must be a valid email' },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password cannot be empty' },
        },
    },
    
      sequelize,
      modelName: 'User',
      // Removed defaultScope temporarily to prevent exclusions that may interfere with login queries.
      // defaultScope: {
      //   attributes: {
      //     exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      //   },
      // },
    }
  );
  
  return User;
};
