// backend/routes/index.js
const express = require('express');
const path = require('path');
const router = express.Router();
const apiRouter = require('./api');



// Development: restore CSRF token at /api/csrf/restore
if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode: CSRF token restoration enabled');
  router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ 'XSRF-Token': csrfToken });
  });
}

// Production: serve React static files and index.html with CSRF token
if (process.env.NODE_ENV === 'production') {

  // Serve index.html at root
  router.get('/', (req, res) => {
    console.log('Serving index.html for root route');
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve static assets from the React build directory
  router.use(
    express.static(
      path.resolve(__dirname, '../../frontend', 'dist')
    )
  );

  // Serve index.html on all other non-API routes
  router.get(/^(?!\/api).*/, (req, res) => {
    console.log('Serving index.html for non-API route');
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// Mount API routes
router.use('/api', apiRouter);

module.exports = router;
