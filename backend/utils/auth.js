


// // backend/utils/auth.js
// const jwt = require('jsonwebtoken');
// const { jwtConfig } = require('../config');
// const { User } = require('../db/models');

// const { secret, expiresIn } = jwtConfig;



// // backend/utils/auth.js
// // ...

// const restoreUser = (req, res, next) => {
//     // token parsed from cookies
//     const { token } = req.cookies;
//     req.user = null;
  
//     return jwt.verify(token, secret, null, async (err, jwtPayload) => {
//       if (err) {
//         return next();
//       }
  
//       try {
//         const { id } = jwtPayload.data;
//         req.user = await User.findByPk(id, {
//           attributes: {
//             include: ['email', 'createdAt', 'updatedAt']
//           }
//         });
//       } catch (e) {
//         res.clearCookie('token');
//         return next();
//       }
  
//       if (!req.user) res.clearCookie('token');
  
//       return next();
//     });
//   };

//   // backend/utils/auth.js
// // ...

// // If there is no current user, return an error
// const requireAuth = function (req, _res, next) {
//     if (req.user) return next();
  
//     const err = new Error('Authentication required');
//     err.title = 'Authentication required';
//     err.errors = { message: 'Authentication required' };
//     err.status = 401;
//     return next(err);
//   }


//   // backend/utils/auth.js
// // ...

// module.exports = { setTokenCookie, restoreUser, requireAuth };










// // backend/utils/auth.js
// const jwt = require('jsonwebtoken');
// const { jwtConfig } = require('../config');
// const { User } = require('../db/models');

// const { secret, expiresIn } = jwtConfig;

// // Set token cookie function
// const setTokenCookie = (res, user) => {
//   // Sign a JWT token with the user's ID
//   const token = jwt.sign(
//     { data: { id: user.id } }, 
//     secret, 
//     { expiresIn }
//   );
  
//   // Set the token in the response cookies
//   res.cookie('token', token, {
//     httpOnly: true, // cookie can't be accessed via JavaScript
//     secure: process.env.NODE_ENV === 'production', // set to true in production for HTTPS
//   });
// };

// // Restore user from the token in the cookies
// const restoreUser = (req, res, next) => {
//   const { token } = req.cookies;
//   req.user = null;

//   return jwt.verify(token, secret, null, async (err, jwtPayload) => {
//     if (err) {
//       return next();
//     }

//     try {
//       const { id } = jwtPayload.data;
//       req.user = await User.findByPk(id, {
//         attributes: ['email', 'createdAt', 'updatedAt'],
//       });
//     } catch (e) {
//       res.clearCookie('token');
//       return next();
//     }

//     if (!req.user) res.clearCookie('token');

//     return next();
//   });
// };

// // Require authentication middleware
// const requireAuth = function (req, _res, next) {
//   if (req.user) return next();

//   const err = new Error('Authentication required');
//   err.title = 'Authentication required';
//   err.errors = { message: 'Authentication required' };
//   err.status = 401;
//   return next(err);
// };

// module.exports = { setTokenCookie, restoreUser, requireAuth };






// 







// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Set token cookie function
const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: { id: user.id } },
    secret,
    { expiresIn }
  );

  res.cookie('token', token, {
    httpOnly: true, // cookie can't be accessed via JavaScript
    secure: process.env.NODE_ENV === 'production', // set to true in production for HTTPS
  });
};

// Restore user from the token in the cookies
const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  if (!token) {
    return next();
  }

  // Updated jwt.verify() with the correct syntax
  jwt.verify(token, secret, { algorithms: ['HS256'] }, async (err, jwtPayload) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.error("Token expired");
      }
      res.clearCookie('token');
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: ['email', 'createdAt', 'updatedAt'],
      });
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// Require authentication middleware
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };
