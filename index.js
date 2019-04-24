// Bring in server.
const server = require('./server.js');

// Server on port 5000.
server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
})
