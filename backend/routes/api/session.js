


// // backend/routes/api/session.js
// const express = require('express');
// const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, restoreUser } = require('../../utils/auth');
// const { User } = require('../../db/models');
// const router = express.Router();

// // backend/routes/api/session.js
// // ...

// // Log in
// router.post(
//     '/',
//     async (req, res, next) => {
//       const { credential, password } = req.body;
  
//       const user = await User.unscoped().findOne({
//         where: {
//           [Op.or]: {
//             username: credential,
//             email: credential
//           }
//         }
//       });
  
//       if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
//         const err = new Error('Login failed');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = { credential: 'The provided credentials were invalid.' };
//         return next(err);
//       }
  
//       const safeUser = {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//       };
  
//       await setTokenCookie(res, safeUser);
  
//       return res.json({
//         user: safeUser
//       });
//     }
//   );


// module.exports = router;




// // backend/routes/api/session.js
// const express = require('express');
// const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');

// const { setTokenCookie, restoreUser } = require('../../utils/auth');
// const { User } = require('../../db/models');
// const router = express.Router();

// // Log in
// router.post(
//     '/',
//     async (req, res, next) => {
//       const { credential, password } = req.body;
  
//       const user = await User.unscoped().findOne({
//         where: {
//           [Op.or]: {
//             username: credential,
//             email: credential
//           }
//         }
//       });

//       console.log('Found user:', user);  // Debugging line to log the result of the query
  
//       if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
//         const err = new Error('Login failed');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = { credential: 'The provided credentials were invalid.' };
//         return next(err);
//       }
  
//       const safeUser = {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//       };
  
//       await setTokenCookie(res, safeUser);
  
//       return res.json({
//         user: safeUser
//       });
//     }
// );

// module.exports = router;


'use strict';

const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router(); // Declare the router first

router.post(
  '/',
  async (req, res, next) => {
    const { credential, password } = req.body;

    console.log('Received credential:', credential); // Debugging line

    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    console.log('Found user:', user ? user.toJSON() : 'No user found');  // More detailed logging

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    console.log('User hashed password:', user.hashedPassword.toString());
    console.log('Password to compare:', password);

    // Compare the provided password with the hashed password
    const passwordMatch = bcrypt.compareSync(password, user.hashedPassword.toString());

    if (!passwordMatch) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

// Add the export here
module.exports = router;
