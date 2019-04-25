const envReader = require('dotenv').config();

// Bring in server.
const server = require('./server.js');

// making the port dynamic for heroku hosting
const port = process.env.PORT || 5000

// server listening on dynamic port or LH:5000
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});